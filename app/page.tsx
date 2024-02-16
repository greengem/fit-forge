import Link from "next/link";
import { IconChartBar, IconBook, IconBarbell, IconPlayerPlayFilled, IconStretching, IconJumpRope, IconActivity, IconBrandOpenai, IconUser, IconUserBolt, IconListCheck } from "@tabler/icons-react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
export default function Home() {

  const cardData = [
    {
      icon: IconBook,
      title: "Discover Your Perfect Workout",
      body: "Dive into an expansive library of exercises complete with detailed guides, videos, and tips. Whether you're aiming to tone, build muscle, or improve flexibility, our vast collection has you covered. Filter by muscle group, difficulty, or equipment to easily find exercises that match your goals. It's like having a personal trainer in your pocket!"
    },
    {
      icon: IconListCheck,
      title: "Tailor-Made Fitness Plans",
      body: "Create workout routines that are uniquely yours. Select from our comprehensive exercise database to craft plans that fit your goals, schedule, and fitness level. Adjust sets, reps, and duration to match your progress. With the ability to personalize your fitness journey, reaching your goals has never been more attainable."
    },
    {
      icon: IconActivity,
      title: "Log As You Lift",
      body: "Stay focused and on track with real-time workout tracking. Initiate any routine from your plan and log your performance as you go—record every rep, set, and the weight you lift with ease. This immediate feedback keeps you motivated and ensures every workout counts towards your fitness milestones."
    },
    {
      icon: IconChartBar,
      title: "Visualize Your Victory",
      body: "Watch your fitness journey unfold with our detailed progress tracking and analytics. From workout summaries to trend analyses, our dashboard offers valuable insights into your performance over time. Set goals, monitor your achievements, and celebrate every improvement. With our analytics, you're not just working out; you're building a better you."
    }
  ];


  return (
    <main className="min-h-dvh text-white bg-gradient-to-b from-black to-zinc-900">
      <nav className="px-3 md:px-10 py-3 mb-5 flex justify-between items-center">
        <h4 className="flex items-center text-lg gap-3 font-semibold tracking-tight"><IconBarbell className="text-primary" /> Tracktive</h4>
      </nav>

      <section className="mb-10 py-5 px-3 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl xl:text-7xl tracking-tighter font-bold">Track every <span className="from-primary to-primary-600 bg-clip-text text-transparent bg-gradient-to-b">Rep </span></h1>
            <h1 className="text-4xl md:text-6xl xl:text-7xl tracking-tighter font-bold mb-5">Achieve every <span className="from-primary to-primary-600 bg-clip-text text-transparent bg-gradient-to-b">Goal </span></h1>
            <p className="text-lg text-zinc-500 mb-5">Your ultimate fitness companion. Stay on track, stay active with Tracktive.</p>
            <div className="flex gap-3">
              <Button color="primary" as={Link} href="/dashboard"><IconPlayerPlayFilled />Get Started</Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image src="/ss.webp" alt="Screenshot of NextBoard" width={2000} height={1250} className="w-full h-auto rounded-xl shadow-xl" />
          </div>
        </div>
      </section>

      <section className="mb-10 py-5 px-3 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cardData.map((card, index) => (
            <Card key={index} className="text-zinc-200 bg-zinc-900/50 backdrop-blur-md shadow-xl" shadow="none">
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
        <h2 className="text-center text-6xl my-10 font-bold">The Perfect Plan <span className="text-primary">For Your Needs</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <Card className="shadow-xl" shadow="none">
              <CardBody className="px-5">
                <div className="flex-none">
                  <h4 className="font-semibold gap-3 text-xl">Free</h4>
                  <p className="text-zinc-500 text-sm mb-5">For the basics</p>
                  <h4 className="text-4xl font-semibold">$0</h4>
                  <p className="mb-5 text-zinc-500 text-sm">Free forever, no commitments</p>
                  <Button size="sm" as={Link} href="/dashboard" className="mb-5"><IconPlayerPlayFilled size={18} /> Get Started</Button>
                  <ul className="space-y-2 text-sm">
                  <li className="flex gap-3 items-center"><IconJumpRope size={18} />3 Custom Programs</li>
                    <li className="flex gap-3 items-center"><IconStretching size={18} />Access to all of our 900+ Exercises</li>
                    <li className="flex gap-3 items-center"><IconActivity size={18} />Unlimited Basic Workout Logs</li>
                    <li className="flex gap-3 items-center"><IconChartBar size={18} />Basic Charts</li>
                    <li className="flex gap-3 items-center"><IconUser size={18} />Simple Profile</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            <Card className="shadow-xl ring-2 ring-primary" shadow="none">
              <CardBody className="px-5">
                <div className="flex-none">
                  <h4 className="font-semibold gap-3 text-xl text-primary">Plus</h4>
                  <p className="text-zinc-500 text-sm mb-5">Our most popular plan</p>
                  <h4 className="text-4xl font-semibold">$3.99</h4>
                  <p className="mb-5 text-zinc-500 text-sm">Per month, cancel anytime.</p>
                  <Button isDisabled color="primary" size="sm" as={Link} href="/dashboard" className="mb-5"><IconPlayerPlayFilled size={18} /> Coming Soon</Button>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-3 items-center"><IconJumpRope size={18} />10 Custom Programs</li>
                    <li className="flex gap-3 items-center"><IconStretching size={18} />Access to all of our 900+ Exercises</li>
                    <li className="flex gap-3 items-center"><IconActivity size={18} />Unlimited Advanced Workout Logs</li>
                    <li className="flex gap-3 items-center"><IconChartBar size={18} />Advanced Charts</li>
                    <li className="flex gap-3 items-center"><IconUserBolt size={18} />Advanced Profile</li>
                    <li className="flex gap-3 items-center"><IconBrandOpenai size={18} />Enhanced with AI</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            <Card className="shadow-xl" shadow="none">
              <CardBody className="px-5">
                <div className="flex-none">
                  <h4 className="font-semibold gap-3 text-xl">Pro</h4>
                  <p className="text-zinc-500 text-sm mb-5">Our complete plan</p>
                  <h4 className="text-4xl font-semibold">$6.99</h4>
                  <p className="mb-5 text-zinc-500 text-sm">Per month, cancel anytime.</p>
                  <Button isDisabled size="sm" as={Link} href="/dashboard" className="mb-5"><IconPlayerPlayFilled size={18} /> Coming Soon</Button>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-3 items-center"><IconJumpRope size={18} />Unlimited Custom Programs</li>
                    <li className="flex gap-3 items-center"><IconStretching size={18} />Access to all of our 900+ Exercises</li>
                    <li className="flex gap-3 items-center"><IconActivity size={18} />Unlimited Advanced Workout Logs</li>
                    <li className="flex gap-3 items-center"><IconChartBar size={18} />Advanced Charts</li>
                    <li className="flex gap-3 items-center"><IconUserBolt size={18} />Advanced Profile</li>
                    <li className="flex gap-3 items-center"><IconBrandOpenai size={18} />Enhanced with AI</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

        </div>
      </section>

    </main>
  );
}
