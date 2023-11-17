/*
  Warnings:

  - You are about to drop the column `SystemRoutineCategory` on the `WorkoutPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutPlan" DROP COLUMN "SystemRoutineCategory",
ADD COLUMN     "systemRoutineCategory" TEXT;
