/*
  Warnings:

  - You are about to drop the column `imagePath` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "imagePath",
ADD COLUMN     "image" TEXT;
