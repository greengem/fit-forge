import { IconBarbell } from "@tabler/icons-react";
import Link from "next/link";

export default function SidebarBrand() {
  return (
    <div className="flex items-center justify-center flex-col pt-5 pb-2">
      <Link href="/">
        <IconBarbell stroke={1} size={64} className="dark:text-primary" />
        <p className="uppercase text-xs text-gray-500">Tracktive</p>
      </Link>
    </div>
  );
}
