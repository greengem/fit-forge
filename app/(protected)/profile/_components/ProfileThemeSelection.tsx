"use client";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {RadioGroup, Radio} from "@nextui-org/react";
import { IconPalette } from "@tabler/icons-react";

export default function ProfileThemeSelection(){

    return (
        <Card className="mb-5 shadow-md" shadow="none">
            <CardHeader className='text-xl font-semibold px-5 pb-0'><IconPalette className='mr-1' />Theme</CardHeader>
            <CardBody className="px-5">
                <RadioGroup 
                    size="sm"
                    label="Coming soon!"
                    orientation="horizontal" 
                    color="primary" 
                    className="text-sm"
                >
                    <Radio value="neon-green">Neon Green</Radio>
                    <Radio value="dark-cyan">Cyan</Radio>
                    <Radio value="dark-hot-pink">Hot Pink</Radio>
                    <Radio value="dark-bright-orange">Bright Orange</Radio>
                </RadioGroup>
            </CardBody>
        </Card>
    )
}