"use client";
import clsx from "clsx";
import { useSidebarToggleContext } from "@/contexts/SidebarToggleContext";

type Variant = "primary" | "secondary" | "success" | "warning" | "danger";

export default function SiteNotice({
  message,
  variant,
  visible,
}: {
  message: string;
  variant: Variant;
  visible: boolean;
}) {
  const { sidebarCollapse } = useSidebarToggleContext();

  const variantClassMap: Record<Variant, string> = {
    primary: "bg-primary text-black",
    secondary: "bg-secondary",
    warning: "bg-success text-black",
    success: "bg-success",
    danger: "bg-danger",
  };

  const layoutClass = clsx(
    `${variantClassMap[variant]} py-1 text-xs uppercase text-center ml-0`,
    {
      "md:ml-20": sidebarCollapse,
      "md:ml-64": !sidebarCollapse,
    },
  );

  if (!visible) {
    return null;
  }

  return <div className={layoutClass}>{message}</div>;
}
