"use client";
import RoutineCards from './RoutineCards';
import {Tabs, Tab} from "@nextui-org/tabs";
import { IconUser } from '@tabler/icons-react';

export default function RoutineDisplay({ userRoutines, systemRoutines }) {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" size='sm' radius='lg' color='success'>
                <Tab key="user" title={<IconUser size={16} />}>
                    <RoutineCards routines={userRoutines} isSystem={false} />
                </Tab>
                <Tab key="strength" title="Strength">
                    Coming Soon
                    <RoutineCards routines={systemRoutines} isSystem={true} />
                </Tab>
                <Tab key="cardio" title="Cardio">
                    Coming Soon
                </Tab>
                <Tab key="stretching" title="Stretching">
                    Coming Soon
                </Tab>
            </Tabs>
        </div>
    )
}