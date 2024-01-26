import { Session } from "next-auth";
import { Avatar } from "@nextui-org/avatar";

interface ProfileHeroProps {
    session: Session;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({ session }) => {
    return(
        <div className="hero flex flex-col justify-center items-center pb-5 pt-10">
            <Avatar 
                color="primary" 
                isBordered 
                showFallback
                name={session.user.name || "User"}
                src={session.user.image} 
                imgProps={{ referrerPolicy: "no-referrer" }}
                className="w-20 h-20 text-large mb-5" 
            />
            <h4 className="text-2xl mb-1">{session.user.name || 'User'}</h4>
            <p className="text-xs text-gray-500">United Kingdom</p>
        </div>
    )
}

export default ProfileHero;
