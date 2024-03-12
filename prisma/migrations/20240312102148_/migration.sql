/*
  Warnings:

  - The values [REPS,DURATION] on the enum `GoalType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GoalType_new" AS ENUM ('WEIGHT');
ALTER TABLE "UserGoal" ALTER COLUMN "goalType" TYPE "GoalType_new" USING ("goalType"::text::"GoalType_new");
ALTER TYPE "GoalType" RENAME TO "GoalType_old";
ALTER TYPE "GoalType_new" RENAME TO "GoalType";
DROP TYPE "GoalType_old";
COMMIT;
