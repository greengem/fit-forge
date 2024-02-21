"use client";
import { useContext } from "react";
import { format } from "date-fns";
import { ActivityModalContext } from "@/contexts/ActivityModalContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";

interface Set {
  weight: number | null;
  reps: number | null;
  exerciseDuration: number | null;
}

interface Exercise {
  id: string;
  exerciseId: string;
  Exercise: {
    name: string;
  };
  sets: Set[];
}

interface Activity {
  id: string;
  name: string;
  duration: number;
  createdAt: Date;
  exercises: Exercise[];
}

export default function ActivityModal() {
  const { activity, isOpen, onOpenChange } = useContext(ActivityModalContext);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      size="3xl"
      isKeyboardDismissDisabled
      scrollBehavior="outside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex-col gap-1 pb-0">
              <h2 className="flex gap-1">
                <time>
                  {format(activity?.createdAt || new Date(), "dd/MM/yyyy")}
                </time>
                <span>-</span>
                <span>{activity?.name}</span>
              </h2>

              <p className="text-sm">{activity?.duration} Mins</p>
            </ModalHeader>
            <ModalBody className="gap-1">
              <Divider />
              {activity?.exercises.map((exercise, i) => (
                <div key={i}>
                  <h2 className="text-md mb-2">{exercise.Exercise.name}</h2>
                  <Table removeWrapper>
                    <TableHeader>
                      <TableColumn>Set</TableColumn>
                      <TableColumn>Reps</TableColumn>
                      <TableColumn>Weight</TableColumn>
                      <TableColumn>Duration</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                      {exercise.sets.map((set, j) => (
                        <TableRow key={j}>
                          <TableCell>{j + 1}</TableCell>
                          <TableCell>{set.reps}</TableCell>
                          <TableCell>{set.weight}</TableCell>
                          <TableCell>{set.exerciseDuration}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Divider className="my-2" />
                </div>
              ))}
            </ModalBody>
            <ModalFooter className="pt-0">
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
