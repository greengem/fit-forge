"use client";
import RoutineCards from './RoutineCards';
import {Tabs, Tab} from "@nextui-org/tabs";

export default function RoutineDisplay({ userRoutines, systemRoutines }) {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options">
                <Tab key="user" title="My Routines">
                    <RoutineCards routines={userRoutines} isSystem={false} />
                </Tab>
                <Tab key="strength" title="Strength">
                    <RoutineCards routines={systemRoutines} isSystem={true} />
                </Tab>
                <Tab key="cardio" title="Cardio">
                    Cardio
                </Tab>
                <Tab key="stretching" title="Stretching">
                    Stretching
                </Tab>
            </Tabs>
        </div>
    )
}