-- AlterTable
ALTER TABLE "SetLog" ADD COLUMN     "duration" INTEGER,
ALTER COLUMN "reps" DROP NOT NULL;
