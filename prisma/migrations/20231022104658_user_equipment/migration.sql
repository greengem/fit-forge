-- CreateTable
CREATE TABLE "UserEquipment" (
    "userId" TEXT NOT NULL,
    "equipmentType" "EquipmentType" NOT NULL,

    CONSTRAINT "UserEquipment_pkey" PRIMARY KEY ("userId","equipmentType")
);

-- AddForeignKey
ALTER TABLE "UserEquipment" ADD CONSTRAINT "UserEquipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
