import Link from "next/link";

export default function Navbar() {
    return (
        <div className="px-5 py-3 dark:bg-custom-gray block md:hidden">
            <ul className="flex space-x-3">
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/workout">Workout</Link></li>
                <li><Link href="/routines">Routines</Link></li>
                <li><Link href="/exercises">Exercises</Link></li>
            </ul>
        </div>
    )
}