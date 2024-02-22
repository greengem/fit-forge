'use client'
import { useSidebarToggleContext } from '@/contexts/SidebarToggleContext';
import { Chip } from "@nextui-org/react";
import { IconBarbell } from "@tabler/icons-react";
import Link from "next/link";
import clsx from 'clsx';

export default function SidebarBrand() {
  const { sidebarCollapse } = useSidebarToggleContext();

  return (
    <div className={clsx("px-5 mb-6", sidebarCollapse ? "flex justify-center" : "")}>
      <Link href="/" className="flex items-center gap-3">
        <div className="flex items-end justify-center w-11 h-[60px] pb-2 bg-primary rounded-b-lg">
          <IconBarbell stroke={1} size={28} className="text-black" />
        </div>
        {!sidebarCollapse &&
          <div className="flex gap-3 items-center pt-[18px]">
            <p className="text-xl">Tracktive</p>
            {/* <Chip color="primary" radius="full">Pro</Chip> */}
          </div>
        }
      </Link>
    </div>
  );
}