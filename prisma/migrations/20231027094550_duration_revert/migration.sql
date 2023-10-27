/*
  Warnings:

  - You are about to drop the column `totalDuration` on the `WorkoutLog` table. All the data in the column will be lost.
  - Added the required column `duration` to the `WorkoutLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutLog" DROP COLUMN "totalDuration",
ADD COLUMN     "duration" INTEGER NOT NULL;
