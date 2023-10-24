/*
  Warnings:

  - You are about to drop the `Timer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Timer" DROP CONSTRAINT "Timer_sessionId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "durationGoal" INTEGER,
ADD COLUMN     "workoutsGoal" INTEGER;

-- DropTable
DROP TABLE "Timer";

-- DropEnum
DROP TYPE "TimerStatus";
