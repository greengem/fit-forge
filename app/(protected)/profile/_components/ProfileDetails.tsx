"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconUser, IconDeviceFloppy } from '@tabler/icons-react';
import { ExpandedProfile } from "@/types/ProfileType";
import { Session } from 'next-auth';

interface ProfileDetailsProps {
  session: Session;
  expandedProfile: ExpandedProfile;
}

export default function ProfileDetails({ session, expandedProfile }: ProfileDetailsProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [age, setAge] = useState(expandedProfile.age || '');
    const [height, setHeight] = useState(expandedProfile.height || '');
    const [weight, setWeight] = useState(expandedProfile.weight || '');

    const handleSubmit = async () => {
        setIsLoading(true);

        const data = {
          age: age ? parseInt(age.toString()) : null,
          height: height ? parseInt(height.toString()) : null,
          weight: weight ? parseInt(weight.toString()) : null
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
          const e = error as Error;
          console.error("Failed to update profile:", e);
          toast.error("Failed to update profile: " + e.message);
        } finally {
          setIsLoading(false);
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
                  value={session.user.name || ''}
                  isRequired 
                />

                <Input 
                    type="email" 
                    label="Email" 
                    placeholder="Enter your email" 
                    value={session.user.email || ''} 
                    isRequired 
                    isDisabled 
                />

                <Input 
                  type="number" 
                  label="Age" 
                  placeholder="Enter your Age" 
                  value={age.toString()}
                  onChange={(e) => setAge(e.target.value)} 
                />

                <Input 
                  type="number" 
                  label="Height" 
                  placeholder="Enter your Height" 
                  value={height.toString()}
                  onChange={(e) => setHeight(e.target.value)} 
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">cm</span>
                    </div>
                  }
                />

                <Input 
                  type="number" 
                  label="Weight" 
                  placeholder="Enter your Weight" 
                  value={weight.toString()}
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
                <Button color="success" onPress={handleSubmit} isLoading={isLoading}>
                    <IconDeviceFloppy />Save
                </Button>
            </CardFooter>
        </Card>
    );
}
