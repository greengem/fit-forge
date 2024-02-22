import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
} from "@tabler/icons-react";
import Link from "next/link";

export default function SidebarSocials() {
  return (
    <div className="w-full grid grid-cols-4 text-primary">
      <Link href="https://www.facebook.com/" className="flex justify-center">
        <IconBrandTiktok />
      </Link>

      <Link href="https://www.facebook.com/" className="flex justify-center">
        <IconBrandX />
      </Link>

      <Link href="https://www.facebook.com/" className="flex justify-center">
        <IconBrandInstagram />
      </Link>

      <Link href="https://www.facebook.com/" className="flex justify-center">
        <IconBrandFacebook />
      </Link>
    </div>
  );
}
