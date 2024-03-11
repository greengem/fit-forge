-- CreateEnum
CREATE TYPE "GoalType" AS ENUM ('WEIGHT', 'REPS', 'DURATION');

-- CreateTable
CREATE TABLE "UserGoal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "goalType" "GoalType" NOT NULL,
    "goalValue" DOUBLE PRECISION NOT NULL,
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGoal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGoal_userId_exerciseId_goalType_key" ON "UserGoal"("userId", "exerciseId", "goalType");

-- AddForeignKey
ALTER TABLE "UserGoal" ADD CONSTRAINT "UserGoal_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
