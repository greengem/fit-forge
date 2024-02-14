/*
  Warnings:

  - The primary key for the `FavoriteExercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `FavoriteExercise` table. All the data in the column will be lost.
  - The primary key for the `UserEquipment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `UserEquipment` table. All the data in the column will be lost.
  - The primary key for the `UserExercisePB` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `UserExercisePB` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WorkoutLog` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `WorkoutPlan` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clerkUserId` to the `FavoriteExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkUserId` to the `UserEquipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkUserId` to the `UserExercisePB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clerkUserId` to the `WorkoutLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "FavoriteExercise" DROP CONSTRAINT "FavoriteExercise_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserEquipment" DROP CONSTRAINT "UserEquipment_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserExercisePB" DROP CONSTRAINT "UserExercisePB_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutLog" DROP CONSTRAINT "WorkoutLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutPlan" DROP CONSTRAINT "WorkoutPlan_userId_fkey";

-- AlterTable
ALTER TABLE "FavoriteExercise" DROP CONSTRAINT "FavoriteExercise_pkey",
DROP COLUMN "userId",
ADD COLUMN     "clerkUserId" TEXT NOT NULL,
ADD CONSTRAINT "FavoriteExercise_pkey" PRIMARY KEY ("clerkUserId", "exerciseId");

-- AlterTable
ALTER TABLE "UserEquipment" DROP CONSTRAINT "UserEquipment_pkey",
DROP COLUMN "userId",
ADD COLUMN     "clerkUserId" TEXT NOT NULL,
ADD CONSTRAINT "UserEquipment_pkey" PRIMARY KEY ("clerkUserId", "equipmentType");

-- AlterTable
ALTER TABLE "UserExercisePB" DROP CONSTRAINT "UserExercisePB_pkey",
DROP COLUMN "userId",
ADD COLUMN     "clerkUserId" TEXT NOT NULL,
ADD CONSTRAINT "UserExercisePB_pkey" PRIMARY KEY ("clerkUserId", "exerciseId");

-- AlterTable
ALTER TABLE "WorkoutLog" DROP COLUMN "userId",
ADD COLUMN     "clerkUserId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutPlan" DROP COLUMN "userId",
ADD COLUMN     "clerkUserId" TEXT;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";
