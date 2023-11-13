import { ExpandedProfile } from "@/types/ProfileType"

interface ProfileStatsProps {
    expandedProfile: ExpandedProfile;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ expandedProfile }) => {
    return (
        <div className="grid grid-flow-col lg:px-40 mb-20">
            {expandedProfile.weight && (
                <div className="text-center">
                    <div className="mb-1 space-x-1">
                        <span className="text-5xl">{expandedProfile.weight}</span>
                        <span className="text-gray-500">kg</span>
                    </div>
                    <div className="text-sm text-gray-500">Weight</div>
                </div>
            )}

            {expandedProfile.height && (
                <div className="text-center">
                    <div className="mb-1 space-x-1">
                        <span className="text-5xl">{expandedProfile.height}</span>
                        <span className="text-gray-500">cm</span>
                    </div>
                    <div className="text-sm text-gray-500">Height</div>
                </div>
            )}

            {expandedProfile.age && (
                <div className="text-center">
                    <div className="mb-1 space-x-1">
                        <span className="text-5xl">{expandedProfile.age}</span>
                        <span className="text-gray-500">y.o</span>
                    </div>
                    <div className="text-sm text-gray-500">Age</div>
                </div>
            )}
        </div>
    )
}

export default ProfileStats;
