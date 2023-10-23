import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions"
import getEquipment from "@/utils/getEquipment";
import getExpandedProfile from "@/utils/getExpandedProfile";
import ProfileHero from "./ProfileHero";
import ProfileStats from "./ProfileStats";
import ProfileEquipment from "./ProfileEquipment";
import ProfileDetails from "./ProfileDetails";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const equipment = await getEquipment(userId);
    const expandedProfile = await getExpandedProfile(userId);

    return (
        <>
            <ProfileHero session={session} />
            <ProfileStats expandedProfile={expandedProfile} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ProfileEquipment equipment={equipment} session={session} />
                <ProfileDetails session={session} expandedProfile={expandedProfile} />
            </div>
        </>
    )
}
