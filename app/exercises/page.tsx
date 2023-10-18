import prisma from '@/db/prisma';
import PageHeading from '@/components/PageHeading/PageHeading';

async function getExercises(){
  const exercises = await prisma.exercise.findMany();
  return exercises;
}

export default async function ExercisesPage() {
  const exercises = await getExercises()

  return (
    <>
    <PageHeading title="Exercises" />
    <table className="w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-6 py-3 text-left font-semibold text-gray-600">Name</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-600">Muscles</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-600">Level</th>
          <th className="px-6 py-3 text-left font-semibold text-gray-600">More Info</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {exercises.map((exercise) => (
          <tr key={exercise.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              <div>
                <p>{exercise.name}</p>
                <p>{exercise.category}</p>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
            <div>
              <p>{exercise.primary_muscles.join(', ')}</p>
                <p>{exercise.secondary_muscles.join(', ')}</p>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{exercise.level}</td>
            <td className="px-6 py-4 whitespace-nowrap"><button>More Info</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
  )
}
