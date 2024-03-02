"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Select, SelectItem } from "@nextui-org/select";
import { Selection } from "@react-types/shared";
import { IconFilter } from "@tabler/icons-react";

const muscles = [
  { label: "Abdominals", value: "abdominals" },
  { label: "Hamstrings", value: "hamstrings" },
  { label: "Adductors", value: "adductors" },
  { label: "Quadriceps", value: "quadriceps" },
  { label: "Biceps", value: "biceps" },
  { label: "Shoulders", value: "shoulders" },
  { label: "Chest", value: "chest" },
  { label: "Middle Back", value: "middle_back" },
  { label: "Calves", value: "calves" },
  { label: "Glutes", value: "glutes" },
  { label: "Lower Back", value: "lower_back" },
  { label: "Lats", value: "lats" },
  { label: "Triceps", value: "triceps" },
  { label: "Traps", value: "traps" },
  { label: "Forearms", value: "forearms" },
  { label: "Neck", value: "neck" },
  { label: "Abductors", value: "abductors" },
];

export default function ExerciseFilterMuscle() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilterMuscle(selection: Selection) {
    const terms = Array.from(selection);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (terms.length > 0) {
      params.set("muscle", terms.join(","));
    } else {
      params.delete("muscle");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const selectedMuscle = searchParams.get("muscle");
  const selectedKeys = selectedMuscle
    ? new Set(selectedMuscle.split(","))
    : undefined;

  return (
    <Select
      key={selectedKeys ? selectedKeys.size : "empty"}
      label="Muscle Group"
      placeholder="Select a muscle..."
      size="sm"
      items={muscles}
      onSelectionChange={handleFilterMuscle}
      selectedKeys={selectedKeys}
      startContent={<IconFilter size={18} />}
      selectionMode="multiple"
    >
      {(muscle) => <SelectItem key={muscle.value}>{muscle.label}</SelectItem>}
    </Select>
  );
}
