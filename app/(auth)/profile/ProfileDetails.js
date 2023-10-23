import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconUser, IconDeviceFloppy } from '@tabler/icons-react';

export default function ProfileDetails({ session }){
    return (
        <Card>
            <CardHeader className='text-xl font-semibold px-5 pb-0'><IconUser className="mr-1" />Details</CardHeader>
            <CardBody className="gap-y-3">
                <Input type="text" label="Name" placeholder="Enter your name" value={session.user.name} isRequired />
                <Input type="email" label="Email" placeholder="Enter your email" value={session.user.email} isRequired isDisabled />
                <Input type="text" label="Age" placeholder="Enter your Age" />
                <Input type="text" label="Height" placeholder="Enter your Height" />
                <Input type="text" label="Weight" placeholder="Enter your Weight" />
                <p className="text-xs text-gray-500">Your data is secure with us. We only use your information to enhance your user experience and never share it with third parties.</p>

            </CardBody>
            <CardFooter className="px-5">
                <Button color="primary"><IconDeviceFloppy />Save</Button>
            </CardFooter>
        </Card>
    )
}