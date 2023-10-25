import Link from "next/link"
import { Button } from "@nextui-org/button"
import { IconBarbell } from "@tabler/icons-react"

export default function HomePage() {
  return (
    <div className="relative h-screen">
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white">
        <h1 className="text-6xl font-bold text-center mb-4 tracking-tight">
          Track Every <span className="text-success">Rep</span>. Achieve Every <span className="text-success">Goal</span>.
        </h1>
        <p className="text-xl text-center mb-8">
          Your ultimate fitness companion. Stay on track, stay active with Tracktive.
        </p>
        <Button color="success" as={Link} href="/dashboard" size="lg" className="mb-10 gap-unit-1">
          <IconBarbell />Get Started 
        </Button>
      </div>
    </div>
  )
}
