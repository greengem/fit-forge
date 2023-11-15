import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {RadioGroup, Radio} from "@nextui-org/react";
import { IconPalette } from "@tabler/icons-react";

export default function ProfileThemeSelection(){
    return (
        <Card className="mb-5 shadow-lg" shadow="none">
            <CardHeader className='text-xl font-semibold px-5 pb-0'><IconPalette className='mr-1' />Theme</CardHeader>
            <CardBody className="px-5">
                <RadioGroup orientation="horizontal" color="success" isDisabled value="neon-green" label="Coming soon!">
                    <Radio value="neon-green">Neon Green</Radio>
                    <Radio value="hot-pink">Hot Pink</Radio>
                    <Radio value="cyan">Cyan</Radio>
                    <Radio value="electric-blue">Electric Blue</Radio>
                    <Radio value="bright-orange">Bright Orange</Radio>
                </RadioGroup>
            </CardBody>
        </Card>
    )
}