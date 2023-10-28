"use client";
import { motion } from 'framer-motion';
import Link from "next/link"
import { Button } from "@nextui-org/button"
import { IconBarbell } from "@tabler/icons-react"

const barbellSpin = {
  hidden: { rotate: -90, opacity: 0 },
  visible: { rotate: 0, opacity: 1, transition: { type: "spring", damping: 10 } }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function HomePage() {
  return (
    <div className="relative md:h-[100vh] hero-container pt-20 md:pt-0">
      <motion.div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white"
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={barbellSpin}>
          <IconBarbell size={200} />
        </motion.div>
        <motion.h1 
          className="text-4xl lg:text-6xl font-bold text-center mb-2 tracking-tight"
          variants={fadeInUp}
        >
          Track Every <span className="text-success">Rep</span>. Achieve Every <span className="text-success">Goal</span>.
        </motion.h1>
        <motion.p className="text-xl text-center mb-10" variants={fadeInUp}>
          Your ultimate fitness companion. Stay on track, stay active with Tracktive.
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Button color="success" as={Link} href="/dashboard" size="lg" className="gap-unit-1">
            <IconBarbell />Get Started 
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
