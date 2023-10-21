import Link from "next/link"
import { Button } from "@nextui-org/button"
import { IconSearch, IconFilePlus, IconNotebook } from "@tabler/icons-react"

export default async function HomePage() {
  return (
    <div className="relative h-screen bg-gradient-to-b from-teal-500 to-blue-600">
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white">
        <h1 className="text-6xl font-bold text-center mb-4 tracking-tight">
          Track Every Rep. Achieve Every Goal.
        </h1>
        <p className="text-xl text-center mb-8">
          Your ultimate fitness companion. Stay on track, stay active with Tracktive.
        </p>
        <Button as={Link} href="/dashboard" size="lg" className="mb-10">Get Started</Button>
        <div className="flex space-x-10">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full mb-2">
              <IconSearch className="w-16 h-16" /> 
            </div>
            <span>Browse Exercises</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full mb-2">
              <IconFilePlus className="w-16 h-16" />
            </div>
            <span>Create Routines</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full mb-2">
              <IconNotebook className="w-16 h-16" />
            </div>
            <span>Log Workouts</span>
          </div>
        </div>
      </div>
    </div>
  )
}
