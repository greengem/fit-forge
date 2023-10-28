"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconUser, IconDeviceFloppy } from '@tabler/icons-react';

export default function ProfileDetails({ session, expandedProfile }) {
    const router = useRouter()
    const [age, setAge] = useState(expandedProfile.age || '');
    const [height, setHeight] = useState(expandedProfile.height || '');
    const [weight, setWeight] = useState(expandedProfile.weight || '');

    const handleSubmit = async () => {
        const data = {
          age: age ? parseInt(age) : null,
          height: height ? parseInt(height) : null,
          weight: weight ? parseInt(weight) : null
        };
      
        try {
          const response = await fetch(`/api/users`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
      
          const result = await response.json();
          if (response.ok) {
            toast.success("Profile updated successfully!");
            router.refresh();
          } else {
            toast.error("Failed to update profile!");
          }
        } catch (error) {
          console.error("Failed to update profile:", error);
          toast.error("Failed to update profile: " + error.message);
        }
      };
      

    return (
        <Card shadow="none" className='shadow-md'>
            <CardHeader className='text-xl font-semibold px-5 pb-0'>
                <IconUser className="mr-1" />Details
            </CardHeader>
            <CardBody className="gap-y-3">
                <Input 
                  type="text" 
                  label="Name" 
                  placeholder="Enter your name" 
                  value={session.user.name} 
                  isRequired 
                />

                <Input 
                    type="email" 
                    label="Email" 
                    placeholder="Enter your email" 
                    value={session.user.email} 
                    isRequired 
                    isDisabled 
                />

                <Input 
                  type="text" 
                  label="Age" 
                  placeholder="Enter your Age" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)} 
                />

                <Input 
                  type="text" 
                  label="Height" 
                  placeholder="Enter your Height" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)} 
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">cm</span>
                    </div>
                  }
                />

                <Input 
                  type="text" 
                  label="Weight" 
                  placeholder="Enter your Weight" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">kg</span>
                    </div>
                  }
                />

                <p className="text-xs text-gray-500">Your data is secure with us. We only use your information to enhance your user experience and never share it with third parties.</p>

                </CardBody>
            <CardFooter className="px-5">
                <Button color="success" onClick={handleSubmit}>
                    <IconDeviceFloppy />Save
                </Button>
            </CardFooter>
        </Card>
    );
}