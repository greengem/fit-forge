// hooks/useToggleFavoriteExercise.js

const useToggleFavoriteExercise = (favoriteExercises) => {
    const isFavorite = (exerciseId) => {
        return favoriteExercises.some(fav => fav.exerciseId === exerciseId);
    };

    const toggleFavoriteExercise = async (exerciseId) => {
        try {
            let response;

            if (isFavorite(exerciseId)) {
                response = await fetch(`/api/users/favorites/${exerciseId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                response = await fetch('/api/users/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ exerciseId }),
                });
            }

            const data = await response.json();

        } catch (error) {
            toast.error('An error occurred while communicating with the server.');
        }
    };

    return toggleFavoriteExercise;
};

export default useToggleFavoriteExercise;
