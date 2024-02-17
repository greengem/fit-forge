'use client';
import { useContext } from "react";
import { ExerciseModalContext } from "@/contexts/ExerciseModalContext";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

function ListItem({ label, value }: { label: string; value: string }) {
  return (
    <li className="capitalize">
      <span className="font-semibold">{label}:</span> {value}
    </li>
  );
}

export default function ExerciseModal() {
  const { exercise, isOpen, onOpenChange } = useContext(ExerciseModalContext);

  return (
    <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange} size="3xl" isKeyboardDismissDisabled scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{exercise?.name}</ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[0, 1].map((index) => (
                  <Image
                    key={index}
                    src={`/images/exercises/${exercise?.image}/images/${index}.jpg`}
                    width={750}
                    height={500}
                    alt={`Exercise photo ${index + 1}`}
                  />
                ))}
              </div>

              <ul className="space-y-2">
                {exercise?.category && <ListItem label="Category" value={exercise?.category} />}
                {exercise?.primary_muscles && exercise?.primary_muscles.length > 0 && (
                  <ListItem label="Primary Muscles" value={exercise?.primary_muscles.join(', ')} />
                )}
                {exercise?.secondary_muscles && exercise?.secondary_muscles.length > 0 && (
                  <ListItem label="Secondary Muscles" value={exercise?.secondary_muscles.join(', ')} />
                )}
                {exercise?.force && <ListItem label="Force" value={exercise?.force} />}
                {exercise?.mechanic && <ListItem label="Mechanic" value={exercise?.mechanic} />}
                {exercise?.equipment && <ListItem label="Equipment" value={exercise?.equipment} />}
                {exercise?.instructions && (
                    <ListItem label="Instructions" value={exercise?.instructions.join(', ')} />
                )}

                {exercise?.tips && exercise?.tips.length > 0 && (
                  <ListItem label="Tips" value={exercise?.tips.join(', ')} />
                )}
              </ul>
            </ModalBody>
            <ModalFooter>
            <ModalFooter className="pt-0">
                <Button color="danger" variant="light" onPress={onClose}>Close</Button>
            </ModalFooter>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
