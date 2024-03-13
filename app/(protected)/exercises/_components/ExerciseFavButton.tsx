'use client';
import { handleToggleFavouriteExercise } from "@/server-actions/ExerciseServerActions";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { toast } from "sonner";
type FavouriteButtonProps = {
    exerciseId: string;
    isFavourite: boolean;
};

export default function ExerciseFavButton({
    exerciseId,
    isFavourite: initialIsFavourite,
} : FavouriteButtonProps) {
    const [isFavourite, setIsFavourite] = useState(initialIsFavourite);

    const handleClick = async () => {
        setIsFavourite(!isFavourite);

        try {
            await handleToggleFavouriteExercise(exerciseId);
        } catch (error) {
            setIsFavourite(isFavourite);
            toast.error('Failed to toggle favourite exercise');
        }
    };

    return (
        <Button
          aria-label="Toggle favourite"
          isIconOnly
          onClick={handleClick}
        >
          {isFavourite ? (
            <IconStarFilled className="text-primary" size={20} />
          ) : (
            <IconStar className="hover:text-primary" size={20} />
          )}
        </Button>
    );
}