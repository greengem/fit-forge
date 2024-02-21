"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Checkbox } from "@nextui-org/checkbox";
import { IconStar } from "@tabler/icons-react";

export default function ExerciseFilterFavourites() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilterFavourites(event: React.ChangeEvent<HTMLInputElement>) {
    const isFavourite = event.target.checked;
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (isFavourite) {
      params.set("favs", "true");
    } else {
      params.delete("favs");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <Checkbox
      size="sm"
      onChange={handleFilterFavourites}
      defaultSelected={searchParams.get("favs") === "true"}
    >
      <span className="flex items-center gap-1">
        <IconStar size={16} /> My Favourites
      </span>
    </Checkbox>
  );
}
