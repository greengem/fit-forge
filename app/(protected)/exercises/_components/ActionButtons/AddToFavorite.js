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
            {isFavorite(exercise.id) ? <IconStarFilled className="text-success" size={20} /> : <IconStar className='hover:text-success' size={20} />}
        </Button>
    )
}
