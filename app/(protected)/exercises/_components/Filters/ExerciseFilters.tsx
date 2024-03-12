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
import ExerciseFilterPerPage from "./ExerciseFilterPerPage";

export default function ExerciseFilters({
  searchParams,
}: {
  searchParams?: {
    id?: string;
    page?: number;
    search?: string;
    muscle?: string;
    cat?: string;
    level?: string;
    force?: string;
    favs?: string;
    perPage?: number;
  };
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const { page, search, id, perPage, ...otherParams } = searchParams || {};
  const hasSearchParams = Object.values(otherParams).some((param) => param);
  const [showFilters, setShowFilters] = useState(hasSearchParams);

  const toggleFilters = () => {
    if (showFilters && hasSearchParams) {
      const params = new URLSearchParams();
      if (search) {
        params.set("search", search);
      }
      if (id) {
        params.set("id", id);
      }
      if (perPage) {
        params.set("perPage", perPage.toString());
      }
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    setShowFilters(!showFilters);
  };

  return (
    <>
      <div className="flex gap-3 mb-3">
        <ExerciseSearch />
        <ExerciseFilterPerPage />
        <Button isIconOnly size="lg" variant="flat" onClick={toggleFilters} aria-label="Toggle Filters">
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
