import Link from "next/link";

export default function Navbar() {
    return (
        <div className="p-5 bg-gray-900 block md:hidden">
            <ul className="flex space-x-2">
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/workout">Workout</Link></li>
                <li><Link href="/routines">Routines</Link></li>
                <li><Link href="/exercises">Exercises</Link></li>
            </ul>
        </div>
    )
}