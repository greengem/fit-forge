"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";
import { Selection } from "@react-types/shared";

export default function ExerciseFilterPerPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handlePerPage(selection: Selection) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    params.set("perPage", Array.from(selection)[0].toString());
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const perPage = searchParams.get("perPage") || "10";
  const selectedKeys = new Set([perPage]);

  return (
    <Select
      label="Per Page"
      size="sm"
      onSelectionChange={handlePerPage}
      selectedKeys={selectedKeys}
      className="w-24 shrink-0"
    >
      <SelectItem key="5" value={5}>
        5
      </SelectItem>
      <SelectItem key="10" value={10}>
        10
      </SelectItem>
      <SelectItem key="15" value={15}>
        15
      </SelectItem>
      <SelectItem key="20" value={20}>
        20
      </SelectItem>
    </Select>
  );
}
