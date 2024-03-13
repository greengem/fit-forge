export default function ExerciseOrderIndicator({ position } : { position: number }) {
    return (
        <span className="bg-primary dark:bg-zinc-800 text-black dark:text-primary rounded-full text-sm flex justify-center items-center h-8 w-8">
            {position + 1}
        </span>
    )
}
