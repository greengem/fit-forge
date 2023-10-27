/*
  Warnings:

  - You are about to drop the column `duration` on the `SetLog` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `WorkoutLog` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `WorkoutPlanExercise` table. All the data in the column will be lost.
  - Added the required column `totalDuration` to the `WorkoutLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SetLog" DROP COLUMN "duration",
ADD COLUMN     "exerciseDuration" INTEGER;

-- AlterTable
ALTER TABLE "UserExercisePB" ADD COLUMN     "exerciseDuration" INTEGER,
ALTER COLUMN "reps" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutLog" DROP COLUMN "duration",
ADD COLUMN     "totalDuration" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutPlanExercise" DROP COLUMN "duration",
ADD COLUMN     "exerciseDuration" INTEGER;
