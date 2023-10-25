-- AlterTable
ALTER TABLE "WorkoutPlan" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutPlanExercise" ADD COLUMN     "isSystemRoutine" BOOLEAN NOT NULL DEFAULT false;
