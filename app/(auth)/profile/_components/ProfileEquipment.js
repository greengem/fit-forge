"use client";
import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import toast from 'react-hot-toast';
import { IconBarbell, IconDeviceFloppy } from '@tabler/icons-react';
const equipmentItems = [
    "body_only",
    "machine",
    "other",
    "foam_roll",
    "kettlebells",
    "dumbbell",
    "cable",
    "barbell",
    "bands",
    "medicine_ball",
    "exercise_ball",
    "e_z_curl_bar"
];

const formatText = (text) => {
    return text.split('_')
               .map(word => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' ');
};


export default function ProfileEquipment({ equipment, session }) {
    const [selectedEquipment, setSelectedEquipment] = useState(equipment || []);

    const handleSave = async () => {
        const response = await fetch('/api/users/equipment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: session.user.id,
                selectedEquipment
            }),
        });
    
        if (response.ok) {
            toast.success("Equipment Updated Successfully!");
        } else {
            toast.error("Error Updating Equipment");
        }
    };

    return (
        <Card>
            <CardHeader className='text-xl font-semibold px-5 pb-0'><IconBarbell className='mr-1' />Equipment</CardHeader>
            <CardBody>
                <CheckboxGroup
                    value={selectedEquipment}
                    onChange={(value) => setSelectedEquipment(value)}
                    color='success'
                >
                    {equipmentItems.map((item, index) => (
                        <Checkbox key={index} value={item}>
                            {formatText(item)}
                        </Checkbox>
                    ))}
                </CheckboxGroup>
            </CardBody>
            <CardFooter className='px-5'>
                <Button color='success' onClick={handleSave}><IconDeviceFloppy />Save</Button>
            </CardFooter>
        </Card>
    )
}
