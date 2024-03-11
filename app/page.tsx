import Link from "next/link";
import {
  IconChartBar,
  IconBook,
  IconPlayerPlayFilled,
  IconStretching,
  IconJumpRope,
  IconActivity,
  IconBrandOpenai,
  IconUser,
  IconListCheck,
  IconFlame,
} from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import PricingCard from "@/components/LandingPage/PricingCard";

export default function Home() {
  const cardData = [
    {
      icon: IconBook,
      title: "Discover Your Perfect Workout",
      body: "Dive into an expansive library of exercises complete with detailed guides, videos, and tips. Whether you're aiming to tone, build muscle, or improve flexibility, our vast collection has you covered. Filter by muscle group, difficulty, or equipment to easily find exercises that match your goals. It's like having a personal trainer in your pocket!",
    },
    {
      icon: IconListCheck,
      title: "Tailor-Made Fitness Plans",
      body: "Create workout routines that are uniquely yours. Select from our comprehensive exercise database to craft plans that fit your goals, schedule, and fitness level. Adjust sets, reps, and duration to match your progress. With the ability to personalize your fitness journey, reaching your goals has never been more attainable.",
    },
    {
      icon: IconActivity,
      title: "Log As You Lift",
      body: "Stay focused and on track with real-time workout tracking. Initiate any routine from your plan and log your performance as you go—record every rep, set, and the weight you lift with ease. This immediate feedback keeps you motivated and ensures every workout counts towards your fitness milestones.",
    },
    {
      icon: IconChartBar,
      title: "Visualize Your Victory",
      body: "Watch your fitness journey unfold with our detailed progress tracking and analytics. From workout summaries to trend analyses, our dashboard offers valuable insights into your performance over time. Set goals, monitor your achievements, and celebrate every improvement. With our analytics, you're not just working out; you're building a better you.",
    },
  ];

  return (
    <main className="min-h-dvh text-white bg-gradient-to-b from-black to-zinc-900">
      <nav className="px-3 md:px-10 py-3 mb-5 flex justify-between items-center">
        <h4 className="flex items-center text-lg gap-2 font-semibold tracking-tight">
          <IconFlame className="text-primary" /> {process.env.NEXT_PUBLIC_BRAND_NAME}
        </h4>
      </nav>

      <section className="mb-10 py-5 px-3 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl xl:text-7xl tracking-tight font-bold">
              Track every{" "}
              <span className="from-primary to-primary-600 bg-clip-text text-transparent bg-gradient-to-b">
                Rep{" "}
              </span>
            </h1>
            <h1 className="text-4xl md:text-6xl xl:text-7xl tracking-tight font-bold mb-5">
              Achieve every{" "}
              <span className="from-primary to-primary-600 bg-clip-text text-transparent bg-gradient-to-b">
                Goal{" "}
              </span>
            </h1>
            <p className="text-lg text-zinc-500 mb-5">
              Your ultimate fitness companion. Stay on track, stay active with
              Tracktive.
            </p>
            <div className="flex gap-3">
              <Button color="primary" as={Link} href="/dashboard">
                <IconPlayerPlayFilled />
                Get Started
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image
              src="/ss.webp"
              alt="Screenshot of NextBoard"
              width={2000}
              height={1250}
              className="w-full h-auto rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="mb-10 py-5 px-3 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cardData.map((card, index) => (
            <Card
              key={index}
              className="text-zinc-200 bg-zinc-900/50 backdrop-blur-md shadow-xl"
              shadow="none"
            >
              <CardHeader className="font-bold gap-3">
                <span className="flex items-center justify-center bg-primary rounded-full h-8 w-8 shrink-0 text-black">
                  <card.icon size={20} />
                </span>
                {card.title}
              </CardHeader>
              <CardBody className="text-sm">{card.body}</CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10 py-5 px-3 md:px-10">
        <h2 className="text-center text-6xl my-10 font-bold">
          The Perfect Plan <span className="text-primary">For Your Needs</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <PricingCard 
            title="Standard"
            subtitle="For the basics"
            price="$0"
            description="Free forever, no commitments"
            buttonText="Get Started"
            buttonLink="/dashboard"
            features={[
              { icon: <IconJumpRope size={18} />, text: "Unlimited Routines" },
              { icon: <IconStretching size={18} />, text: "Access to all of our 900+ Exercises" },
              { icon: <IconActivity size={18} />, text: "Unlimited Basic Workout Logs" },
              { icon: <IconChartBar size={18} />, text: "Basic Charts" },
              { icon: <IconUser size={18} />, text: "Simple Profile" },
            ]}
          />

          <PricingCard 
            title="Pro (Monthly)"
            subtitle="Per month, cancel anytime."
            price="$4.99"
            description="Per month, cancel anytime."
            buttonText="Coming soon"
            buttonDisabled={true}
            buttonLink="/dashboard"
            highlight={true}
            features={[
              { icon: <IconJumpRope size={18} />, text: "Unlimited Routines" },
              { icon: <IconStretching size={18} />, text: "Access to all of our 900+ Exercises" },
              { icon: <IconActivity size={18} />, text: "Unlimited Advnaced Workout Logs" },
              { icon: <IconChartBar size={18} />, text: "Advanced Charts" },
              { icon: <IconUser size={18} />, text: "Advanced Profile" },
              { icon: <IconBrandOpenai size={18} />, text: "AI Features"},
            ]}
          />

          <PricingCard 
            title="Pro (Yearly)"
            subtitle="Per month, cancel anytime."
            price="$49.99"
            description="Per month, cancel anytime."
            buttonText="Coming soon"
            buttonLink="/dashboard"
            buttonDisabled={true}
            features={[
              { icon: <IconJumpRope size={18} />, text: "Unlimited Routines" },
              { icon: <IconStretching size={18} />, text: "Access to all of our 900+ Exercises" },
              { icon: <IconActivity size={18} />, text: "Unlimited Advnaced Workout Logs" },
              { icon: <IconChartBar size={18} />, text: "Advanced Charts" },
              { icon: <IconUser size={18} />, text: "Advanced Profile" },
              { icon: <IconBrandOpenai size={18} />, text: "AI Features"},
            ]}
          />

        </div>
      </section>
    </main>
  );
}
