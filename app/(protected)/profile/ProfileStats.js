export default function ProfileStats(){
    return(
        <div className="grid grid-cols-3 lg:px-40 mb-20">
            <div className="text-center">
                <div className="mb-1 space-x-1">
                    <span className="text-5xl">80</span>
                    <span className="text-gray-500">kg</span>
                </div>
                <div className="text-sm text-gray-500">Weight</div>
            </div>
            <div className="text-center">
                <div className="mb-1 space-x-1">
                    <span className="text-5xl">187</span>
                    <span className="text-gray-500">cm</span>
                </div>
                <div className="text-sm text-gray-500">Height</div>
            </div>
            <div className="text-center">
                <div className="mb-1 space-x-1">
                    <span className="text-5xl">38</span>
                    <span className="text-gray-500">y.o</span>
                </div>
                <div className="text-sm text-gray-500">Age</div>
            </div>
        </div>
    )
}