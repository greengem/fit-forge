"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";
import { Selection } from "@react-types/shared";
import { IconFilter } from "@tabler/icons-react";

const forces = [
  { label: "Pull", value: "pull" },
  { label: "Push", value: "push" },
  { label: "Static", value: "static" },
];

export default function ExerciseFilterForce() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilterForce(selection: Selection) {
    const terms = Array.from(selection);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (terms.length > 0) {
      params.set("force", terms.join(","));
    } else {
      params.delete("force");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const selectedForce = searchParams.get("force");
  const selectedKeys = selectedForce
    ? new Set(selectedForce.split(","))
    : undefined;

  return (
    <Select
      key={selectedKeys ? selectedKeys.size : "empty"}
      label="Force"
      placeholder="Select a force..."
      size="sm"
      items={forces}
      onSelectionChange={handleFilterForce}
      selectedKeys={selectedKeys}
      startContent={<IconFilter size={18} />}
      selectionMode="multiple"
    >
      {(force) => <SelectItem key={force.value}>{force.label}</SelectItem>}
    </Select>
  );
}
