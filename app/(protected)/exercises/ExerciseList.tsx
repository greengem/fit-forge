'use client'
import { useState } from "react";
import ExerciseSearch from "./ExerciseSearch";
import ExerciseFilters from "./ExerciseFilters"
import { IconInfoCircle } from "@tabler/icons-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter} from "@nextui-org/modal";
import { Chip } from "@nextui-org/chip";
import { Pagination, User, Button, useDisclosure } from "@nextui-org/react"
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

interface Exercise {
  id: string;
  name: string;
  aliases: string[];
  primary_muscles: Muscle[];
  secondary_muscles: Muscle[];
  force?: ForceType;
  level: LevelType;
  mechanic?: MechanicType;
  equipment?: EquipmentType;
  category: CategoryType;
  instructions: string[];
  description?: string;
  image?: string;
  tips: string[];
  date_created: Date;
  date_updated?: Date;
}

enum Muscle {
  abdominals,
  hamstrings,
  adductors,
  quadriceps,
  biceps,
  shoulders,
  chest,
  middle_back,
  calves,
  glutes,
  lower_back,
  lats,
  triceps,
  traps,
  forearms,
  neck,
  abductors
}

enum CategoryType {
  strength,
  stretching,
  plyometrics,
  strongman,
  powerlifting,
  cardio,
  olympic_weightlifting
}

enum EquipmentType {
  body_only,
  machine,
  other,
  foam_roll,
  kettlebells,
  dumbbell,
  cable,
  barbell,
  bands,
  medicine_ball,
  exercise_ball,
  e_z_curl_bar
}

enum ForceType {
  pull,
  push,
  static
}

enum LevelType {
  beginner = "beginner",
  intermediate = "intermediate",
  expert = "expert"
}

enum MechanicType {
  compound,
  isolation
}
interface ExerciseListProps {
  exercises: Exercise[];
}

const levelColorMap: { [key in LevelType]: "success" | "warning" | "danger" } = {
  beginner: "success",
  intermediate: "warning",
  expert: "danger",
};

function ExerciseList({ exercises }: ExerciseListProps): JSX.Element {
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const [filters, setFilters] = useState({ category: null, muscleGroup: null });
    const [searchQuery, setSearchQuery] = useState("");

    const filteredExercises = exercises.filter((exercise) => {
        if (filters.category && exercise.category !== filters.category) return false;
        if (
        filters.muscleGroup &&
        !exercise.primary_muscles.includes(filters.muscleGroup) &&
        !exercise.secondary_muscles.includes(filters.muscleGroup)
        )
        return false;

        if (
        searchQuery &&
        !exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        return false;

        return true;
    });

    const displayedExercises = filteredExercises.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <ExerciseSearch setSearchQuery={setSearchQuery} />
                <ExerciseFilters onFilterChange={setFilters} />
            </div>

            <div className="overflow-x-auto">
                <Table aria-label="Exercise Table" className="mb-5">
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>MUSCLES</TableColumn>
                        <TableColumn>LEVEL</TableColumn>
                        <TableColumn><></></TableColumn>
                    </TableHeader>
                    <TableBody>
                    {displayedExercises.map((exercise) => (
                        <TableRow key={exercise.id}>
                        <TableCell className="capitalize">
                            <User
                            avatarProps={{ radius: "lg", src: `/images/exercises/${exercise.image}/images/0.jpg` }}
                            description={exercise.category}
                            name={exercise.name}
                            />
                            </TableCell>
                        <TableCell className="capitalize">
                        <div className="flex flex-col">
                            <p className="text-bold text-small capitalize">{exercise.primary_muscles.join(', ')}</p>
                            <p className="text-bold text-tiny capitalize text-default-400">{exercise.secondary_muscles.join(', ')}</p>
                        </div>
                        </TableCell>
                        <TableCell>
                            <Chip radius="sm" className="capitalize" color={levelColorMap[exercise.level]} size="sm" variant="flat">
                            {exercise.level}
                            </Chip>
                        </TableCell>
                        <TableCell className="flex justify-end"><Button size="sm" isIconOnly onPress={() => {
                                setSelectedExercise(exercise);
                                onOpen();
                                }}><IconInfoCircle /></Button></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex w-full justify-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={Math.ceil(filteredExercises.length / rowsPerPage)}
                    onChange={(newPage) => setPage(newPage)}
                />
            </div>

            {selectedExercise && (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{selectedExercise.name}</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <Image 
                                        src={`/images/exercises/${selectedExercise.image}/images/0.jpg`} 
                                        width={750}
                                        height={500} 
                                        alt="Exercise photo 1"
                                    />
                                    <Image 
                                        src={`/images/exercises/${selectedExercise.image}/images/1.jpg`} 
                                        width={750}
                                        height={500} 
                                        alt="Exercise photo 2"
                                    />
                                </div>

                                <ul className="space-y-2">
                                {selectedExercise.category && 
                                    <li className="capitalize"><strong className="text-primary">Category:</strong> {selectedExercise.category}</li>}
                                
                                {selectedExercise.primary_muscles && selectedExercise.primary_muscles.length > 0 && 
                                    <li className="capitalize"><strong className="text-primary">Primary Muscles:</strong> {selectedExercise.primary_muscles.join(', ')}</li>}
                                
                                {selectedExercise.secondary_muscles && selectedExercise.secondary_muscles.length > 0 &&
                                    <li className="capitalize"><strong className="text-primary">Secondary Muscles:</strong> {selectedExercise.secondary_muscles.join(', ')}</li>}
                                
                                {selectedExercise.force && 
                                    <li className="capitalize"><strong className="text-primary">Force:</strong> {selectedExercise.force}</li>}
                                
                                {selectedExercise.mechanic &&
                                    <li className="capitalize"><strong className="text-primary">Mechanic:</strong> {selectedExercise.mechanic}</li>}
                                
                                {selectedExercise.equipment && 
                                    <li className="capitalize"><strong className="text-primary">Equipment:</strong> {selectedExercise.equipment}</li>}
                                
                                {selectedExercise.instructions &&
                                    <li><strong className="text-primary">Instructions:</strong> {selectedExercise.instructions}</li>}
                                
                                {selectedExercise.tips && selectedExercise.tips.length > 0 && 
                                    <li className="capitalize"><strong className="text-primary">Tips:</strong> {selectedExercise.tips.join(', ')}</li>}
                                </ul>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>Close</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            )}
        </>
    );
}
export default ExerciseList;
