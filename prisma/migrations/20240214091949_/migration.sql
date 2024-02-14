/*
  Warnings:

  - You are about to drop the `FavoriteExercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FavoriteExercise" DROP CONSTRAINT "FavoriteExercise_exerciseId_fkey";

-- DropTable
DROP TABLE "FavoriteExercise";

-- CreateTable
CREATE TABLE "FavouriteExercise" (
    "userId" TEXT NOT NULL,
    "favouritedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "FavouriteExercise_pkey" PRIMARY KEY ("userId","exerciseId")
);

-- AddForeignKey
ALTER TABLE "FavouriteExercise" ADD CONSTRAINT "FavouriteExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
