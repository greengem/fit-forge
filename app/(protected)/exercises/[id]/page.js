import getExercise from "@/app/lib/getExercise";
import getExercises from "@/app/lib/getExercises";
import PageHeading from '@/components/PageHeading/PageHeading';
import { Chip } from "@nextui-org/react";
import Image from "next/image";
{/*
export async function generateStaticParams() {
    const allExercises = await getExercises();
    return allExercises.map((exercise) => ({ 
        id: exercise.id 
    }));
}
*/}

async function getExerciseData(params) {
    return await getExercise(params.id);
}

export default async function ExercisePage({ params }) {
    const exercise = await getExerciseData(params);
    if (!exercise) return notFound();

    return (
        <>

        <PageHeading title={exercise.name} />

        {exercise.level && (
            <div>
                <Chip radius="sm" size="sm" color="success" className="capitalize mb-3">{exercise.level}</Chip>
            </div>
        )}

        {exercise.aliases && exercise.aliases.length > 0 && (
            <div>
                <span>Instructions: </span>
                <ol className="list-decimal list-inside">
                {exercise.aliases.map((alias, index) => (
                    <li key={index}>{alias}</li>
                ))}
                </ol>
            </div>
        )}

        {exercise.image && (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[0, 1].map((index) => (
                        <div key={index}>
                    <Image
                        
                        src={`/images/exercises/${exercise.image}/images/${index}.jpg`}
                        width={750}
                        height={500}
                        alt={`Exercise photo ${index + 1}`}
                        className="rounded-xl w-full h-auto"
                    />
                    </div>
                    ))}
                </div>
            </div>
        )}

        {exercise.primary_muscles && exercise.primary_muscles.length > 0 && (
            <div>
                <span>Primary Muscles: </span>
                <div className="flex gap-1">
                    {exercise.primary_muscles.map((muscle, index) => (
                        <Chip color="success" size="sm" radius="sm" key={index} className="capitalize">{muscle}</Chip>
                    ))}
                </div>
            </div>
        )}

        {exercise.secondary_muscles && exercise.secondary_muscles.length > 0 && (
            <div>
                <span>Secondary Muscles: </span>
                <div className="flex gap-1">
                    {exercise.secondary_muscles.map((muscle, index) => (
                        <Chip color="secondary" size="sm" radius="sm" key={index} className="capitalize">{muscle}</Chip>
                    ))}
                </div>
            </div>
        )}

        {exercise.category && (
            <div>
                <span>Category: </span>
                <span className="capitalize">{exercise.category}</span>
            </div>
        )}

        {exercise.force && (
            <div>
                <span>Force: </span>
                <span className="capitalize">{exercise.force}</span>
            </div>
        )}



        {exercise.equipment && (
            <div>
                <span>Equipment: </span>
                <span className="capitalize">{exercise.equipment}</span>
            </div>
        )}

        {exercise.instructions && exercise.instructions.length > 0 && (
            <div>
                <span>Instructions: </span>
                <ol className="list-decimal list-inside">
                {exercise.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                ))}
                </ol>
            </div>
        )}
        
        </>
    )
}
