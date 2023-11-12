import React, { ChangeEvent } from 'react';
import { Select, SelectItem } from '@nextui-org/select';
import { CategoryType, Muscle } from '@prisma/client';

interface ExerciseFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

interface Filters {
  category: CategoryType | null;
  muscleGroup: Muscle | null;
}

const categories = [
  { value: CategoryType.strength, label: 'Strength' },
  { value: CategoryType.cardio, label: 'Cardio' },
  { value: CategoryType.stretching, label: 'Stretching' },
  { value: CategoryType.plyometrics, label: 'Plyometrics' },
  { value: CategoryType.strongman, label: 'Strongman' },
  { value: CategoryType.powerlifting, label: 'Powerlifting' },
  { value: CategoryType.olympic_weightlifting, label: 'Olympic Weightlifting' },
];

const muscleGroups = [
  { value: Muscle.abdominals, label: 'Abdominals' },
  { value: Muscle.hamstrings, label: 'Hamstrings' },
  { value: Muscle.adductors, label: 'Adductors' },
  { value: Muscle.quadriceps, label: 'Quadriceps' },
  { value: Muscle.biceps, label: 'Biceps' },
  { value: Muscle.shoulders, label: 'Shoulders' },
  { value: Muscle.chest, label: 'Chest' },
  { value: Muscle.middle_back, label: 'Middle Back' },
  { value: Muscle.calves, label: 'Calves' },
  { value: Muscle.glutes, label: 'Glutes' },
  { value: Muscle.lower_back, label: 'Lower Back' },
  { value: Muscle.lats, label: 'Lats' },
  { value: Muscle.triceps, label: 'Triceps' },
  { value: Muscle.traps, label: 'Traps' },
  { value: Muscle.forearms, label: 'Forearms' },
  { value: Muscle.neck, label: 'Neck' },
  { value: Muscle.abductors, label: 'Abductors' },
];

export default function ExerciseFilters({ onFilterChange }: ExerciseFiltersProps) {

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      category: event.target.value as CategoryType,
      muscleGroup: null,
    });
  };
  
  const handleMuscleGroupChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({
      category: null,
      muscleGroup: event.target.value as Muscle,
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-2">
        <Select label="Category" placeholder="All" onChange={handleCategoryChange} size="sm">
          {categories.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </Select>

        <Select label="Muscle Group" placeholder="All" onChange={handleMuscleGroupChange} size="sm">
          {muscleGroups.map((muscle) => (
            <SelectItem key={muscle.value} value={muscle.value}>
              {muscle.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  );
}
