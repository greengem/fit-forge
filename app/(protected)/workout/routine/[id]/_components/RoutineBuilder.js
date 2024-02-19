"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

import RoutineDetails from './RoutineDetails';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import ExerciseTable from './ExerciseTable';
import SaveButton from './SaveButton';

const RoutineBuilder = ({ routineId, favoriteExercises, existingRoutine }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [routineName, setRoutineName] = useState('');
  const [notes, setNotes] = useState('');
  const searchInputRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (routineId !== 'new') {
      const fetchRoutine = async () => {
        const response = await fetch(`/api/routines/${routineId}`);
        const data = await response.json();
  
        if (data && data.name && Array.isArray(data.WorkoutPlanExercise)) {
          setRoutineName(data.name);
          setSelectedExercises(data.exercises || []);
          setNotes(data.notes);
        } else {
          toast.error('Error fetching routine details.');
        }
      };
  
      fetchRoutine();
    }
  }, [routineId]);

  const executeSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    const response = await fetch(`/api/exercises/search?q=${searchTerm}`);
    const data = await response.json();
    setSearchResults(data);
  };

  const addExerciseToRoutine = (exercise) => {
    if (selectedExercises.some(e => e.id === exercise.id)) return;
    
    const { id, name, trackingType } = exercise;
    
    const newExercise = {
      id,
      name,
      sets: 1,
      reps: trackingType === 'reps' ? 0 : undefined,
      exerciseDuration: trackingType === 'duration' ? 0 : undefined,
      trackingType: 'reps',
    };
  
    setSelectedExercises([...selectedExercises, newExercise]);
    setSearchTerm('');
    setSearchResults([]);
    searchInputRef.current?.focus();
  };

  const updateExercise = (index, field, value) => {
      const updatedExercises = [...selectedExercises];

      if (field === 'trackingType') {
          if (value === 'reps') {
              updatedExercises[index]['exerciseDuration'] = undefined;
          } else if (value === 'duration') {
              updatedExercises[index]['reps'] = undefined;
          }
      }

      updatedExercises[index][field] = value;
      setSelectedExercises(updatedExercises);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updatedExercises = [...selectedExercises];
    const temp = updatedExercises[index - 1];
    updatedExercises[index - 1] = updatedExercises[index];
    updatedExercises[index] = temp;
    toast.success('Exercise moved up');
    setSelectedExercises(updatedExercises);
  };

  const moveDown = (index) => {
    if (index === selectedExercises.length - 1) return;
    const updatedExercises = [...selectedExercises];
    const temp = updatedExercises[index + 1];
    updatedExercises[index + 1] = updatedExercises[index];
    updatedExercises[index] = temp;
    toast.success('Exercise moved down');
    setSelectedExercises(updatedExercises);
  };

  const deleteExercise = (index) => {
    const isConfirmed = window.confirm("Are you sure you want to remove this exercise?");
    if (isConfirmed) {
        const updatedExercises = [...selectedExercises];
        updatedExercises.splice(index, 1);
        toast.success('Exercise removed');
        setSelectedExercises(updatedExercises);
    }
  };

  const validateForm = () => {
    if (!routineName.trim()) {
      toast.error('Routine Name is required.');
      return false;
    }
  
    if (selectedExercises.length === 0) {
      toast.error('At least one exercise is required.');
      return false;
    }
  
    for (let exercise of selectedExercises) {
      if (exercise.sets < 1) {
        toast.error(`${exercise.name} should have at least 1 set.`);
        return false;
      }
      
      if (exercise.trackingType === 'reps' && (exercise.reps ?? 0) < 1) {
        toast.error(`${exercise.name} should have at least 1 rep.`);
        return false;
      }
      
      if (exercise.trackingType === 'duration' && (exercise.exerciseDuration ?? 0) <= 0) {
        toast.error(`${exercise.name} should have a duration greater than zero.`);
        return false;
      }    
    }
  
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);

    const exercisesWithOrder = selectedExercises.map((exercise, index) => {
      let { reps, exerciseDuration, trackingType } = exercise;
    
      if (exercise.trackingType === 'reps') {
        exerciseDuration = exercise.exerciseDuration !== 0 ? exercise.exerciseDuration : undefined;
      } else if (exercise.trackingType === 'duration') {
        reps = exercise.reps !== 0 ? exercise.reps : undefined;
      }
      
      return {
        ...exercise,
        reps,
        exerciseDuration,
        trackingType,
        order: index + 1,
      };
    });
    
    try {
      let response;
      
      if (routineId === 'new') {
        response = await fetch('/api/routines', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ routineName, exercises: exercisesWithOrder, notes }),
        });
      } else { 
        response = await fetch(`/api/routines/${routineId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ routineName, exercises: exercisesWithOrder, notes }),
        });
      }
    
      const data = await response.json();
    
      if (data.success) {
        toast.success('Routine saved successfully!');
        router.push('/workout');
        router.refresh();
      } else {
        toast.error('Error saving routine.');
      }
    } catch (error) {
      toast.error('Unexpected error while saving routine.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-2">
      <RoutineDetails 
        routineName={routineName} 
        setRoutineName={setRoutineName}
        notes={notes}
        setNotes={setNotes}
      />
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={executeSearch}
        setSearchResults={setSearchResults}
        forwardedRef={searchInputRef}
      />
      <SearchResults 
        searchResults={searchResults}
        addExerciseToRoutine={addExerciseToRoutine}
        selectedExercises={selectedExercises}
      />
      <ExerciseTable 
        selectedExercises={selectedExercises}
        updateExercise={updateExercise}
        moveUp={moveUp}
        moveDown={moveDown}
        deleteExercise={deleteExercise}
        favoriteExercises={favoriteExercises}
      />
      <SaveButton handleSave={handleSave} isLoading={isSaving} />
    </div>
  );
}

export default RoutineBuilder;
