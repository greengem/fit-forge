-- AlterTable
ALTER TABLE "UserExercisePB" ADD COLUMN     "workoutLogId" TEXT;

-- AddForeignKey
ALTER TABLE "UserExercisePB" ADD CONSTRAINT "UserExercisePB_workoutLogId_fkey" FOREIGN KEY ("workoutLogId") REFERENCES "WorkoutLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
