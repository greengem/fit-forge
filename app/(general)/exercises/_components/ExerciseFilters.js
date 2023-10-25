import React from 'react';
import { Select, SelectItem } from '@nextui-org/select';
import { Checkbox } from "@nextui-org/checkbox";

const categories = [
  { value: 'strength', label: 'Strength' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'stretching', label: 'Stretching' },
  { value: 'plyometrics', label: 'Plyometrics' },
  { value: 'strongman', label: 'Strongman' },
  { value: 'powerlifting', label: 'Powerlifting' },
  { value: 'olympic_weightlifting', label: 'Olympic Weightlifting' },
];

const muscleGroups = [
  { value: 'abdominals', label: 'Abdominals' },
  { value: 'hamstrings', label: 'Hamstrings' },
  { value: 'adductors', label: 'Adductors' },
  { value: 'quadriceps', label: 'Quadriceps' },
  { value: 'biceps', label: 'Biceps' },
  { value: 'shoulders', label: 'Shoulders' },
  { value: 'chest', label: 'Chest' },
  { value: 'middle_back', label: 'Middle Back' },
  { value: 'calves', label: 'Calves' },
  { value: 'glutes', label: 'Glutes' },
  { value: 'lower_back', label: 'Lower Back' },
  { value: 'lats', label: 'Lats' },
  { value: 'triceps', label: 'Triceps' },
  { value: 'traps', label: 'Traps' },
  { value: 'forearms', label: 'Forearms' },
  { value: 'neck', label: 'Neck' },
  { value: 'abductors', label: 'Abductors' },
];

export default function ExerciseFilters({ onFilterChange }) {
  const handleCategoryChange = (event) => {
    onFilterChange((prev) => ({ ...prev, category: event.target.value }));
  };

  const handleMuscleGroupChange = (event) => {
    onFilterChange((prev) => ({ ...prev, muscleGroup: event.target.value }));
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-2">
        <Select label="Category" placeholder="All" onChange={handleCategoryChange} size='sm'>
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </Select>

        <Select label="Muscle Group" placeholder='All' onChange={handleMuscleGroupChange} size='sm'>
          {muscleGroups.map((muscle) => (
            <SelectItem key={muscle.value} value={muscle.value}>
              {muscle.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      { /* TODO: Implement filter.
      
      <Checkbox color='success' className='pl-3'>Filter exercises by my equipment.</Checkbox>*/}
    </>
  );
}
