"use client";
import React from 'react';
import { Select, SelectItem } from '@nextui-org/select';
import {Checkbox} from "@nextui-org/checkbox";
import Link from 'next/link';
interface ExerciseFiltersProps {
  onFilterChange: (value: any) => void;
}

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

interface Filters {
  category?: string | null;
  muscleGroup?: string | null;
}

export default function ExerciseFilters({ onFilterChange }: ExerciseFiltersProps) {
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange((prev: Filters) => ({ ...prev, category: event.target.value }));
  };

  const handleMuscleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange((prev: Filters) => ({ ...prev, muscleGroup: event.target.value }));
  };

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Select label="Category" placeholder="All" onChange={handleCategoryChange}>
        {categories.map((category) => (
          <SelectItem key={category.value} value={category.value}>
            {category.label}
          </SelectItem>
        ))}
      </Select>

      <Select label="Muscle Group" placeholder='All' onChange={handleMuscleGroupChange}>
        {muscleGroups.map((muscle) => (
          <SelectItem key={muscle.value} value={muscle.value}>
            {muscle.label}
          </SelectItem>
        ))}
      </Select>
    </div>
    <Checkbox color='success'>Filter exercises by my equipment.</Checkbox>
    
    </>
  );
}
