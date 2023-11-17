"use client";
import RoutineCards from './RoutineCards';
import {Tabs, Tab} from "@nextui-org/tabs";
import { IconUser, IconJumpRope, IconStretching, IconSeeding, IconScale, IconBarbell } from '@tabler/icons-react';

export default function RoutineDisplay({ userRoutines, systemRoutines }) {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" size='sm' color='success' variant='bordered'>
                <Tab 
                    key="user" 
                    title={
                        <div className='flex items-center space-x-2'>
                            <IconUser />
                            <span className='hidden lg:block'>User</span>
                        </div>
                    }
                >
                    <h4 className='text-xl font-semibold mb-3'>My Routines</h4>
                    <RoutineCards routines={userRoutines} isSystem={false} />
                </Tab>
                <Tab 
                    key="strength" 
                    title={
                        <div className='flex items-center space-x-2'>
                            <IconBarbell />
                            <span className='hidden lg:block'>Strength</span>
                        </div>
                    }
                >
                    <h4 className='text-xl font-semibold mb-3'>Strength</h4>
                    <RoutineCards routines={systemRoutines} isSystem={true} />
                </Tab>
                <Tab 
                    key="cardio" 
                    title={
                        <div className='flex items-center space-x-2'>
                            <IconJumpRope />
                            <span className='hidden lg:block'>Cardio</span>
                        </div>
                    }
                >
                    <h4 className='text-xl font-semibold mb-3'>Cardio</h4>
                    <p>Coming soon</p>
                </Tab>
                <Tab 
                    key="flexibility" 
                    title={
                        <div className='flex items-center space-x-2'>
                            <IconStretching />
                            <span className='hidden lg:block'>Flexibility</span>
                        </div>
                    }
                >
                    <h4 className='text-xl font-semibold mb-3'>Flexibility</h4>
                    <p>Coming soon</p>
                </Tab>
                <Tab 
                    key="weightLoss" 
                    title={
                        <div className='flex items-center space-x-2'>
                            <IconScale />
                            <span className='hidden lg:block'>Weight Loss</span>
                        </div>
                    }
                >
                    <h4 className='text-xl font-semibold mb-3'>Weight Loss</h4>
                    <p>Coming soon</p>
                </Tab>
                <Tab 
                    key="beginner" 
                    title={
                        <div className='flex items-center space-x-2'>
                            <IconSeeding />
                            <span className='hidden lg:block'>Beginner</span>
                        </div>
                    }
                >
                    <h4 className='text-xl font-semibold mb-3'>Beginner</h4>
                    <p>Coming soon</p>
                </Tab>
            </Tabs>
        </div>
    )
}