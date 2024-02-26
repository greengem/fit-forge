/*
  Warnings:

  - You are about to drop the column `name` on the `WorkoutLog` table. All the data in the column will be lost.
  - Made the column `workoutPlanId` on table `WorkoutLog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WorkoutLog" DROP COLUMN "name",
ALTER COLUMN "workoutPlanId" SET NOT NULL;
