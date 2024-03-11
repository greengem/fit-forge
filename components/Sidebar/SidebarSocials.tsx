import Link from "next/link";
import { Button } from "@nextui-org/button";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
} from "@tabler/icons-react";

export default function SidebarSocials() {
  return (
    <div className="w-full grid grid-cols-4 text-primary">
      <Button
        size="sm"
        color="primary"
        variant="ghost"
        isIconOnly
        as={Link}
        href="https://www.facebook.com/"
        className="flex justify-center"
      >
        <IconBrandTiktok />
      </Button>

      <Button
        size="sm"
        color="primary"
        variant="ghost"
        isIconOnly
        as={Link}
        href="https://www.facebook.com/"
        className="flex justify-center"
      >
        <IconBrandX />
      </Button>

      <Button
        size="sm"
        color="primary"
        variant="ghost"
        isIconOnly
        as={Link}
        href="https://www.facebook.com/"
        className="flex justify-center"
      >
        <IconBrandInstagram />
      </Button>

      <Button
        size="sm"
        color="primary"
        variant="ghost"
        isIconOnly
        as={Link}
        href="https://www.facebook.com/"
        className="flex justify-center"
      >
        <IconBrandFacebook />
      </Button>
    </div>
  );
}
