import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import getEquipment from "@/app/lib/getEquipment";
import getExpandedProfile from "@/app/lib/getExpandedProfile";

import ProfileHero from "./_components/ProfileHero";
import ProfileStats from "./_components/ProfileStats";
import ProfileEquipment from "./_components/ProfileEquipment";
import ProfileDetails from "./_components/ProfileDetails";
import ProfileActions from "./_components/ProfileActions";
import ProfileThemeSelection from "./_components/ProfileThemeSelection";

import { ExpandedProfile } from "@/types/ProfileType";
import { EquipmentType } from "@prisma/client";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) {
        return <div>No user session available</div>;
    }

    const equipment: EquipmentType[] = await getEquipment(userId);
    const expandedProfile: ExpandedProfile | null = await getExpandedProfile(userId);

    if (!expandedProfile) {
        return <div>Profile not found</div>;
    }

    return (
        <>
            <ProfileHero session={session} />
            <ProfileStats expandedProfile={expandedProfile} />
            <ProfileThemeSelection />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <ProfileDetails session={session} expandedProfile={expandedProfile} />
                <ProfileEquipment equipment={equipment} session={session} />
            </div>
            <ProfileActions />
        </>
    )
}
