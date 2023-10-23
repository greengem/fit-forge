import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions"
import getEquipment from "@/utils/getEquipment";
import getExpandedProfile from "@/utils/getExpandedProfile";
import ProfileHero from "./_components/ProfileHero";
import ProfileStats from "./_components/ProfileStats";
import ProfileEquipment from "./_components/ProfileEquipment";
import ProfileDetails from "./_components/ProfileDetails";

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
                <ProfileDetails session={session} expandedProfile={expandedProfile} />
                <ProfileEquipment equipment={equipment} session={session} />
            </div>
        </>
    )
}
