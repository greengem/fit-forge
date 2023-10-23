import { IconBarbell } from "@tabler/icons-react"

export default function SidebarBrand() {
    return (
        <div className="flex items-center justify-center flex-col pt-5 pb-2">
            <IconBarbell stroke={1} size={64} className="text-success" />
            <p className="uppercase text-xs text-gray-500">Tracktive</p>
        </div>
    )
}