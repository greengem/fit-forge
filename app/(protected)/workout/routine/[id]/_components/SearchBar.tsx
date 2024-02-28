"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@nextui-org/input";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  return (
    <Input
      placeholder="Search exercises..."
      label="Search"
      className="grow mb-3"
      size="sm"
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get("search")?.toString()}
    />
  );
}
