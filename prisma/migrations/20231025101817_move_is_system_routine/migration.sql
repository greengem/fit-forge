/*
  Warnings:

  - You are about to drop the column `isSystemRoutine` on the `WorkoutPlanExercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "isSystemRoutine" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "WorkoutPlanExercise" DROP COLUMN "isSystemRoutine";
