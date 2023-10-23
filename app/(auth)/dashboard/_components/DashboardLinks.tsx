import { Button } from "@nextui-org/button";
import Link from "next/link";
import { IconJumpRope, IconList, IconStretching, IconUser, IconActivity } from '@tabler/icons-react';

export default function DashboardLinks() {
    const links = [
        { href: '/workout', icon: IconJumpRope, label: 'Start a Workout' },
        { href: '/routines', icon: IconList, label: 'Create a Routine' },
        { href: '/exercises', icon: IconStretching, label: 'Browse Exercises' },
        { href: '/activity', icon: IconActivity, label: 'View Activity' },
        { href: '/profile', icon: IconUser, label: 'Edit Profile' }
    ];

    return (
        <div className="flex flex-wrap gap-x-3 gap-y-2">
            {links.map(link => (
                <Button color="default" variant="ghost" key={link.href} as={Link} href={link.href} className="gap-unit-1">
                    <link.icon />{link.label}
                </Button>
            ))}
        </div>
    )
}
