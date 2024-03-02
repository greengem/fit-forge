import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import ExerciseTable from "./ExerciseTable";
import { CategoryType, Muscle, LevelType, ForceType } from "@prisma/client";
import ExercisePagination from "./Filters/ExercisePagination";
import { Exercise } from "@prisma/client";

interface UserRoutine {
  id: string;
  name: string;
  exerciseCount: number;
}

export default async function ExerciseFetch({
  search,
  cat,
  muscle,
  level,
  force,
  currentPage,
  userRoutines,
  favs,
  equipmentOwned,
  perPage,
  mode,
  selectedExercises
}: {
  search: string;
  cat: string[];
  muscle: string[];
  level: string[];
  force: string[];
  currentPage: number;
  userRoutines?: UserRoutine[];
  favs: boolean;
  equipmentOwned: boolean;
  perPage: number;
  mode: string;
  selectedExercises?: any;
}) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const userEquipment = await prisma.userEquipment.findMany({
    where: {
      userId: userId,
    },
    select: {
      equipmentType: true,
    },
  });

  const userEquipmentOwned = userEquipment.map(
    (equipment) => equipment.equipmentType,
  );

  const searchWords = search.split(" ");

  const exercises = await prisma.exercise.findMany({
    take: perPage,
    skip: (currentPage - 1) * perPage,
    where: {
      AND: searchWords.map((word) => ({
        name: {
          contains: word,
          mode: "insensitive",
        },
      })),
      category: cat.length > 0 ? { in: cat as CategoryType[] } : undefined,
      level: level.length > 0 ? { in: level as LevelType[] } : undefined,
      force: force.length > 0 ? { in: force as ForceType[] } : undefined,
      equipment: equipmentOwned ? { in: userEquipmentOwned } : undefined,
      ...(muscle.length > 0
        ? {
            OR: [
              { primary_muscles: { hasEvery: muscle as Muscle[] } },
              { secondary_muscles: { hasEvery: muscle as Muscle[] } },
            ],
          }
        : {}),
      ...(favs
        ? {
            favouritedBy: {
              some: {
                userId: userId,
              },
            },
          }
        : {}),
    },
    orderBy: {
      name: "asc",
    },
  });

  let finalExercises = exercises;

  if (mode === "createRoutine" && selectedExercises) {
    const filteredExercises = exercises.filter(
      (exercise) => !selectedExercises.some((selected: Exercise) => selected.id === exercise.id)
    );
  
    finalExercises = [...selectedExercises, ...filteredExercises];
  }

  const numberOfResults = await prisma.exercise.count({
    where: {
      AND: searchWords.map((word) => ({
        name: {
          contains: word,
          mode: "insensitive",
        },
      })),
      category: cat.length > 0 ? { in: cat as CategoryType[] } : undefined,
      level: level.length > 0 ? { in: level as LevelType[] } : undefined,
      force: force.length > 0 ? { in: force as ForceType[] } : undefined,
      equipment: equipmentOwned ? { in: userEquipmentOwned } : undefined,
      ...(muscle.length > 0
        ? {
            OR: [
              { primary_muscles: { hasEvery: muscle as Muscle[] } },
              { secondary_muscles: { hasEvery: muscle as Muscle[] } },
            ],
          }
        : {}),
      ...(favs
        ? {
            favouritedBy: {
              some: {
                userId: userId,
              },
            },
          }
        : {}),
    },
  });

  const favouriteExercises = await prisma.favouriteExercise.findMany({
    where: {
      userId: userId,
    },
    select: {
      exerciseId: true,
    },
  });

  const favouriteExercisesSet = new Set(
    favouriteExercises.map((fav) => fav.exerciseId),
  );

  return (
    <>
      <ExerciseTable
        exercises={finalExercises}
        favouriteExercises={favouriteExercisesSet}
        userRoutines={userRoutines}
        mode={mode}
        highlightedExercises={mode === "createRoutine" ? selectedExercises : undefined}
      />
      <ExercisePagination
        numberOfResults={numberOfResults}
        perPage={perPage}
      />
    </>
  );
}
