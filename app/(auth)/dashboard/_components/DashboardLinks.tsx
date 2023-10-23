import { Button } from "@nextui-org/button";
import Link from "next/link";
import { IconDashboard, IconJumpRope, IconList, IconStretching, IconUser } from '@tabler/icons-react';

export default function DashboardLinks() {
    return (
        <div className="flex flex-wrap gap-x-3 gap-y-2">
            <Button color="success" as={Link} href="/workout" className="gap-unit-1">
                <IconJumpRope />Start a Workout
            </Button>
            <Button color="success" as={Link} href="/routines" className="gap-unit-1">
                <IconList />Create a Routine
            </Button>
            <Button color="success" as={Link} href="/exercises" className="gap-unit-1">
                <IconStretching />Browse Exercises
            </Button>
            <Button color="success" as={Link} href="/profile" className="gap-unit-1">
                <IconUser />Edit Profile
            </Button>
        </div>
    )
}