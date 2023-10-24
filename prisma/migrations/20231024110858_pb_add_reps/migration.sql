/*
  Warnings:

  - Added the required column `reps` to the `UserExercisePB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserExercisePB" ADD COLUMN     "reps" INTEGER NOT NULL;
