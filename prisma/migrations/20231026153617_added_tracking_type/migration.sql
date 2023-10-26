-- CreateEnum
CREATE TYPE "TrackingType" AS ENUM ('reps', 'duration');

-- AlterTable
ALTER TABLE "WorkoutPlanExercise" ADD COLUMN     "trackingType" "TrackingType" NOT NULL DEFAULT 'reps';
