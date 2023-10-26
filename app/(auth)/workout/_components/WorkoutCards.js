"use client";
import { useState } from 'react';
import CardGrid from "@/components/Grid/CardGrid";
import RoutineCard from "@/components/Cards/RoutineCard";

export default function WorkoutCards({ routines, isSystem }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
        setIsExpanded(prev => !prev);
    }

    return (
        <CardGrid>
            {routines.map((routine) => (
                <RoutineCard 
                    key={routine.id}
                    routine={routine}
                    isSystem={isSystem}
                    isExpanded={isExpanded}
                    onToggleExpanded={toggleExpanded}
                    onAction={() => {}}
                    isRoutine={false}
                />
            ))}
        </CardGrid>
    );
}
