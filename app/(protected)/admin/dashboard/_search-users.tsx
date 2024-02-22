"use client";

import { usePathname, useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mb-5">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search") as string;
          router.push(pathname + "?search=" + queryTerm);
        }}
      >
        <Input
          label="Search for Users"
          placeholder="John Doe..."
          id="search"
          name="search"
          type="text"
          className="mb-3"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
