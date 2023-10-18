export default function ProgressBar({ percentage }) {
    return (
        <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
                <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-teal-600">
                        {percentage}%
                    </span>
                </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                <div style={{ width: `${percentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"></div>
            </div>
        </div>
    );
}
