"use client";
import { Button } from "@nextui-org/button";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

export default function AddToFavorite({ loadingFavorite, toggleFavoriteExercise, isFavorite, exercise }) {
    return (
        <Button 
            onPress={() => toggleFavoriteExercise(exercise.id)}
            isIconOnly
            isLoading={loadingFavorite[exercise.id]}
        >
            {isFavorite(exercise.id) ? <IconStarFilled className="text-primary" size={20} /> : <IconStar className='hover:text-primary' size={20} />}
        </Button>
    )
}
