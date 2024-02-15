import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import getEquipment from "@/app/lib/getEquipment";

import ProfileHero from "./_components/ProfileHero";
import ProfileStats from "./_components/ProfileStats";
import ProfileEquipment from "./_components/ProfileEquipment";
import ProfileDetails from "./_components/ProfileDetails";
import ProfileActions from "./_components/ProfileActions";

export default async function ProfilePage() {
    const user = await currentUser();

    if (!user) {
        throw new Error('You must be signed in to view this page.');
    }

    const userId = user.id;
    const username = user?.username || undefined;
    const userImage = user?.imageUrl || undefined;
    const userEmailAddress = user?.emailAddresses[0]?.emailAddress || undefined;

    const userMeasurements = await prisma.userInfo.findUnique({
        where: {
            userId: userId,
        },
        select: {
            age: true,
            height: true,
            weight: true,
        }
    });

    const equipmentObjects = await prisma.userEquipment.findMany({
        where: {
            userId: userId,
        },
        select: {
            equipmentType: true,
        }
    });

    const equipment = equipmentObjects.map(obj => obj.equipmentType);

    return (
        <>
            <ProfileHero userImage={userImage} username={username} />
            {userMeasurements && (
                <ProfileStats userMeasurements={userMeasurements} />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <ProfileDetails username={username} userEmailAddress={userEmailAddress} userMeasurements={userMeasurements} />
                <ProfileEquipment equipment={equipment} />
            </div>
            <ProfileActions />
        </>
    )
}
