/*
  Warnings:

  - The primary key for the `FavoriteExercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clerkUserId` on the `FavoriteExercise` table. All the data in the column will be lost.
  - The primary key for the `UserEquipment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clerkUserId` on the `UserEquipment` table. All the data in the column will be lost.
  - The primary key for the `UserExercisePB` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clerkUserId` on the `UserExercisePB` table. All the data in the column will be lost.
  - You are about to drop the column `clerkUserId` on the `WorkoutLog` table. All the data in the column will be lost.
  - You are about to drop the column `clerkUserId` on the `WorkoutPlan` table. All the data in the column will be lost.
  - Added the required column `userId` to the `FavoriteExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserEquipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserExercisePB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `WorkoutLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavoriteExercise" DROP CONSTRAINT "FavoriteExercise_pkey",
DROP COLUMN "clerkUserId",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "FavoriteExercise_pkey" PRIMARY KEY ("userId", "exerciseId");

-- AlterTable
ALTER TABLE "UserEquipment" DROP CONSTRAINT "UserEquipment_pkey",
DROP COLUMN "clerkUserId",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "UserEquipment_pkey" PRIMARY KEY ("userId", "equipmentType");

-- AlterTable
ALTER TABLE "UserExercisePB" DROP CONSTRAINT "UserExercisePB_pkey",
DROP COLUMN "clerkUserId",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "UserExercisePB_pkey" PRIMARY KEY ("userId", "exerciseId");

-- AlterTable
ALTER TABLE "WorkoutLog" DROP COLUMN "clerkUserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutPlan" DROP COLUMN "clerkUserId",
ADD COLUMN     "userId" TEXT;
