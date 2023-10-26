"use client";
import { FC, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

import { RoutineDetails } from './RoutineDetails';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import ExerciseTable from './ExerciseTable';
import { SaveButton } from './SaveButton';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps?: number;
  duration?: number;
  order?: number;
  trackingType: 'reps' | 'duration';
}

  type ExerciseField = 'sets' | 'reps' | 'duration' | 'trackingType';

const RoutineBuilder: FC<{ routineId: string }> = ({ routineId }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [routineName, setRoutineName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);
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

  const addExerciseToRoutine = (exercise: Exercise) => {
    if (selectedExercises.some(e => e.id === exercise.id)) return;
    
    const { id, name, trackingType } = exercise;
    
    const newExercise: Exercise = {
      id,
      name,
      sets: 1,
      reps: trackingType === 'reps' ? 0 : undefined,
      duration: trackingType === 'duration' ? 0 : undefined,
      trackingType: 'reps',
    };
  
    setSelectedExercises([...selectedExercises, newExercise]);
    setSearchTerm('');
    setSearchResults([]);
    searchInputRef.current?.focus();
  };

  const updateExercise = (index: number, field: ExerciseField, value: number | 'reps' | 'duration') => {
      const updatedExercises = [...selectedExercises];

      if (field === 'trackingType') {
          if (value === 'reps') {
              updatedExercises[index]['duration'] = undefined;
          } else if (value === 'duration') {
              updatedExercises[index]['reps'] = undefined;
          }
      }

      (updatedExercises[index][field] as any) = value;
      setSelectedExercises(updatedExercises);
  };



  

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updatedExercises = [...selectedExercises];
    const temp = updatedExercises[index - 1];
    updatedExercises[index - 1] = updatedExercises[index];
    updatedExercises[index] = temp;
    toast.success('Exercise moved up');
    setSelectedExercises(updatedExercises);
  };

  const moveDown = (index: number) => {
    if (index === selectedExercises.length - 1) return;
    const updatedExercises = [...selectedExercises];
    const temp = updatedExercises[index + 1];
    updatedExercises[index + 1] = updatedExercises[index];
    updatedExercises[index] = temp;
    toast.success('Exercise moved down');
    setSelectedExercises(updatedExercises);
  };

  const deleteExercise = (index: number) => {
    const updatedExercises = [...selectedExercises];
    updatedExercises.splice(index, 1);
    toast.success('Exercise removed');
    setSelectedExercises(updatedExercises);
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
      
      if (exercise.trackingType === 'duration' && (exercise.duration ?? 0) <= 0) {
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
      let { reps, duration, trackingType } = exercise;
    
      if (exercise.trackingType === 'reps') {
        duration = exercise.duration !== 0 ? exercise.duration as number : undefined;
      } else if (exercise.trackingType === 'duration') {
        reps = exercise.reps !== 0 ? exercise.reps as number : undefined;
      }
      
      
    
      return {
        ...exercise,
        reps,
        duration,
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
        router.push('/routines');
        router.refresh();
      } else {
        console.error("Server responded with error:", data.error);
        toast.error('Error saving routine.');
      }
    } catch (error) {
      console.error("Error during save:", error);
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
      />
      <SaveButton handleSave={handleSave} isLoading={isSaving} />
    </div>
  );
}

export default RoutineBuilder;
