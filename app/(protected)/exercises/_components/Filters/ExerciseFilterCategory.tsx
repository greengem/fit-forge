"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";
import { Selection } from "@react-types/shared";
import { IconFilter } from "@tabler/icons-react";

const categories = [
  { label: "Strength", value: "strength" },
  { label: "Stretching", value: "stretching" },
  { label: "Plyometrics", value: "plyometrics" },
  { label: "Strongman", value: "strongman" },
  { label: "Powerlifting", value: "powerlifting" },
  { label: "Cardio", value: "cardio" },
  { label: "Olympic Weightlifting", value: "olympic_weightlifting" },
];

export default function ExerciseFilterCategory() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilterCategory(selection: Selection) {
    const terms = Array.from(selection);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (terms.length > 0) {
      params.set("cat", terms.join(","));
    } else {
      params.delete("cat");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const selectedCategory = searchParams.get("cat");
  const selectedKeys = selectedCategory
    ? new Set(selectedCategory.split(","))
    : undefined;

  return (
    <Select
      key={selectedKeys ? selectedKeys.size : "empty"}
      label="Category"
      placeholder="Select a category..."
      size="sm"
      items={categories}
      onSelectionChange={handleFilterCategory}
      selectedKeys={selectedKeys}
      startContent={<IconFilter size={18} />}
      selectionMode="multiple"
    >
      {(category) => (
        <SelectItem key={category.value}>{category.label}</SelectItem>
      )}
    </Select>
  );
}
