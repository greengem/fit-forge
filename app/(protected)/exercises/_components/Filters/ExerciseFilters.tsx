"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ExerciseSearch from "./ExerciseSearch";
import ExerciseFilterCategory from "./ExerciseFilterCategory";
import ExerciseFilterLevel from "./ExerciseFilterDifficulty";
import ExerciseFilterForce from "./ExerciseFilterForce";
import ExerciseFilterMuscle from "./ExerciseFilterMuscle";
import ExerciseUserFilters from "./ExerciseUserFilters";
import { Button } from "@nextui-org/button";
import { IconFilter, IconFilterOff } from "@tabler/icons-react";

export default function ExerciseFilters({
  searchParams,
}: {
  searchParams?: {
    page?: number;
    search?: string;
    muscle?: string;
    cat?: string;
    level?: string;
    force?: string;
    favs?: string;
  };
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const { page, search, ...otherParams } = searchParams || {};
  const hasSearchParams = Object.values(otherParams).some((param) => param);
  const [showFilters, setShowFilters] = useState(hasSearchParams);

  const toggleFilters = () => {
    if (showFilters && hasSearchParams) {
      const params = new URLSearchParams();
      if (search) {
        params.set("search", search);
      }
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    setShowFilters(!showFilters);
  };

  return (
    <>
      <div className="flex gap-3 mb-3">
        <ExerciseSearch />
        <Button isIconOnly size="lg" variant="flat" onClick={toggleFilters}>
          {showFilters ? <IconFilterOff /> : <IconFilter />}
        </Button>
      </div>
      {showFilters && (
        <div className=" mb-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            <ExerciseFilterCategory />
            <ExerciseFilterMuscle />
            <ExerciseFilterLevel />
            <ExerciseFilterForce />
          </div>
          <ExerciseUserFilters />
        </div>
      )}
    </>
  );
}
