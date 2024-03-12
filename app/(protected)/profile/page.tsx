import { currentUser } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";

import ProfileHero from "./_components/ProfileHero";
import ProfileStats from "./_components/ProfileStats";
import ProfileEquipment from "./_components/ProfileEquipment";
import ProfileActions from "./_components/ProfileActions";
import ProfileMeasurements from "./_components/ProfileMeasurements";
import ProfileDetails from "./_components/ProfileDetails";

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be signed in to view this page.");
  }

  const userId = user.id;
  const username = user?.username || undefined;
  const firstName = user?.firstName || undefined;
  const lastName = user?.lastName || undefined;
  const userImage = user?.imageUrl || undefined;

  const userMeasurements = await prisma.userInfo.findUnique({
    where: {
      userId: userId,
    },
    select: {
      age: true,
      height: true,
      weight: true,
    },
  });

  const equipmentObjects = await prisma.userEquipment.findMany({
    where: {
      userId: userId,
    },
    select: {
      equipmentType: true,
    },
  });

  const equipment = equipmentObjects.map((obj: { equipmentType: string }) => obj.equipmentType);

  return (
    <>
      <ProfileHero userImage={userImage} username={username} />
      {userMeasurements && <ProfileStats userMeasurements={userMeasurements} />}

      <ProfileDetails
        username={username}
        firstName={firstName}
        lastName={lastName}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
        <ProfileMeasurements userMeasurements={userMeasurements} />
        <ProfileEquipment equipment={equipment} />
      </div>

      <ProfileActions />
    </>
  );
}
