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
  reps: number;
  order?: number;
}

const RoutineBuilder: FC<{ routineId: string }> = ({ routineId }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [routineName, setRoutineName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const searchInputRef = useRef(null);

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
    setSelectedExercises([...selectedExercises, {
      ...exercise,
      sets: 3,
      reps: 8,
    }]);
    setSearchTerm('');
    setSearchResults([]);
    searchInputRef.current?.focus();
  };

  const updateExercise = (index: number, field: keyof Exercise, value: number) => {
    const updatedExercises = [...selectedExercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
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
      if (exercise.sets < 1 || exercise.reps < 1) {
        toast.error(`${exercise.name} should have at least 1 set and 1 rep.`);
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
  
    const exercisesWithOrder = selectedExercises.map((exercise, index) => ({
      ...exercise,
      order: index + 1,
    }));
  
    let response;
    
    if (routineId === 'new') { // New Routine
      response = await fetch('/api/routines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ routineName, exercises: exercisesWithOrder, notes }),
      });
    } else { // Update existing Routine
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
  };
  
  

  return (
    <div className="space-y-4">
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
      <SaveButton handleSave={handleSave} />
    </div>
  );
}

export default RoutineBuilder;
