"use client";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

export default function DeleteButton({ id }: { id: string }) {
    const router = useRouter()
    const handleDelete = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this workout?');

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await fetch(`/api/workouts/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the workout');
            }
    
            toast.success('Routine deleted successfully!');
            router.refresh();
        } catch (error) {
            console.error('There was an error deleting the workout:', error);
            toast.error('There was an error deleting the workout:');
        }
    }

    return (
        <button onClick={handleDelete} className="bg-red-500 p-2">Delete</button>
    )
}
