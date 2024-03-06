"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Pagination } from "@nextui-org/pagination";

export default function ExercisePagination({
  numberOfResults,
  perPage,
}: {
  numberOfResults: number;
  perPage: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const totalPages = Math.ceil(numberOfResults / perPage);

  return (
    <div className="flex justify-center">
      <Pagination
        showControls
        isCompact
        total={totalPages}
        page={currentPage}
        initialPage={1}
        onChange={createPageURL}
      />
    </div>
  );
}
