'use client';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Exercise } from '@/types/ExerciseType';

interface ExerciseModalProps {
  selectedExercise: Exercise;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function ListItem({ label, value }: { label: string; value: string }) {
  return (
    <li className="capitalize">
      <span className="text-primary">{label}:</span> {value}
    </li>
  );
}

export default function ExerciseModal({ selectedExercise, isOpen, onOpenChange }: ExerciseModalProps) {
  const {
    name,
    image,
    category,
    primary_muscles,
    secondary_muscles,
    force,
    mechanic,
    equipment,
    instructions,
    tips,
  } = selectedExercise;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{name}</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[0, 1].map((index) => (
                  <Image
                    key={index}
                    src={`/images/exercises/${image}/images/${index}.jpg`}
                    width={750}
                    height={500}
                    alt={`Exercise photo ${index + 1}`}
                  />
                ))}
              </div>

              <ul className="space-y-2">
                {category && <ListItem label="Category" value={category} />}
                {primary_muscles && primary_muscles.length > 0 && (
                  <ListItem label="Primary Muscles" value={primary_muscles.join(', ')} />
                )}
                {secondary_muscles && secondary_muscles.length > 0 && (
                  <ListItem label="Secondary Muscles" value={secondary_muscles.join(', ')} />
                )}
                {force && <ListItem label="Force" value={force} />}
                {mechanic && <ListItem label="Mechanic" value={mechanic} />}
                {equipment && <ListItem label="Equipment" value={equipment} />}
                {instructions && (
                    <ListItem label="Instructions" value={instructions.join(', ')} />
                )}

                {tips && tips.length > 0 && (
                  <ListItem label="Tips" value={tips.join(', ')} />
                )}
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
