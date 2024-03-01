import { Input } from "@nextui-org/input";
import { IconSearch } from "@tabler/icons-react";
import { Kbd } from "@nextui-org/kbd";

export default function SidebarSearch() {
  return (
    <Input
      labelPlacement="outside"
      placeholder="Search..."
      className="px-5 mb-3"
      radius="sm"
      startContent={<IconSearch />}
      endContent={
        <Kbd
          classNames={{ base: "shadow-none bg-zinc-900" }}
          keys={["command"]}
        >
          F
        </Kbd>
      }
    />
  );
}
