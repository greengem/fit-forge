/*
  Warnings:

  - Made the column `trackingType` on table `WorkoutLogExercise` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WorkoutLogExercise" ALTER COLUMN "trackingType" SET NOT NULL;
