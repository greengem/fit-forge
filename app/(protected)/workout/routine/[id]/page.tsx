import { auth } from "@clerk/nextjs";
import PageHeading from "@/components/PageHeading/PageHeading";
import RoutineBuilder from "./_components/RoutineBuilder";
import { fetchRoutine } from "./_components/fetchRoutine";
import { searchExercises } from "./_components/searchExercises";

export default async function NewRoutinePage({
  params, searchParams,
}: {
  params: { id: string };
  searchParams?: {
    search?: string;
  };
}) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const routineId = params.id;
  const existingRoutine = await fetchRoutine(routineId);
  if (!existingRoutine && routineId !== "new") {
    return (<p>Routine not found.</p>);
  }

  const search = searchParams?.search || "";
  const searchResults = await searchExercises(search);

  return (
    <>
      <PageHeading
        title={
          existingRoutine
            ? `Edit ${existingRoutine.name}`
            : "Create New Routine"
        }
      />
      <RoutineBuilder
        existingRoutine={existingRoutine}
        routineId={routineId}
        searchResults={searchResults}
      />
    </>
  );
}
