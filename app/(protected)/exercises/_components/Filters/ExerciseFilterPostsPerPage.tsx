"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {Select, SelectItem} from "@nextui-org/select";
import { Selection } from "@react-types/shared";

export default function ExerciseFilterPostsPerPage() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handlePostsPerPage(selection: Selection) {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        params.set("postsPerPage", Array.from(selection)[0].toString());
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    const postsPerPage = searchParams.get("postsPerPage") || "5";
    const selectedKeys = new Set([postsPerPage]);

    return (
        <Select 
            label="Per page" 
            size="sm" 
            onSelectionChange={handlePostsPerPage} 
            selectedKeys={selectedKeys}
            className="w-32"
        >
            <SelectItem key="5" value={5}>5</SelectItem>
            <SelectItem key="10" value={10}>10</SelectItem>
            <SelectItem key="15" value={15}>15</SelectItem>
            <SelectItem key="20" value={20}>20</SelectItem>
        </Select>
    )
}