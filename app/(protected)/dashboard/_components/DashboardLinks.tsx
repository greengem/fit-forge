"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader } from "@nextui-org/card";

export default function DashboardLinks() {
  const links = [
    {
      title: "Exercises",
      description: "Browse Exercises",
      image: "02.webp",
      href: "/exercises",
      titleColour: "text-white",
      descriptionColour: "text-primary",
    },
    {
      title: "Routine",
      description: "Create a Routine",
      image: "21.webp",
      href: "edit-routine/step-1",
      titleColour: "text-white",
      descriptionColour: "text-primary",
    },
    {
      title: "Workout",
      description: "Start a Workout",
      image: "e.webp",
      href: "/workout",
      titleColour: "text-white",
      descriptionColour: "text-primary",
    },
    {
      title: "Activity",
      description: "View Activity",
      image: "22.webp",
      href: "/activity",
      titleColour: "text-white",
      descriptionColour: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
      {links.map((link, index) => (
        <Link key={index} href={link.href}>
          <Card
            key={index}
            className="w-full aspect-square xl:aspect-video shadow-md"
            isPressable
            shadow="none"
          >
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p
                className={clsx(
                  "text-xs uppercase font-bold",
                  link.titleColour,
                )}
              >
                {link.title}
              </p>
              <p
                className={clsx("font-medium text-xl", link.descriptionColour)}
              >
                {link.description}
              </p>
            </CardHeader>
            <Image
              alt="Card background"
              className="z-0 w-full h-full object-cover dark:brightness-50 grayscale"
              src={`/card-images/${link.image}`}
              width={640}
              height={640}
            />
          </Card>
        </Link>
      ))}
    </div>
  );
}
