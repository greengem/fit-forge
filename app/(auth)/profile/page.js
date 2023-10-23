import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions"
import getEquipment from "@/utils/getEquipment";
import ProfileHero from "./ProfileHero";
import ProfileStats from "./ProfileStats";
import ProfileEquipment from "./ProfileEquipment";
import ProfileDetails from "./ProfileDetails";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    const equipment = await getEquipment(session.user.id); 

    return (
        <>
            <ProfileHero session={session} />
            <ProfileStats />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ProfileEquipment equipment={equipment} session={session} />
                <ProfileDetails session={session} />
            </div>
        </>
    )
}
