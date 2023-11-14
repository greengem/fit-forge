"use client";
import { Button } from "@nextui-org/react";
import { useSidebarVisibility } from "@/contexts/SidebarContext";
import { IconMenu2 } from "@tabler/icons-react";

export default function SidebarToggle() {
    const { toggleSidebar } = useSidebarVisibility();
    return <Button isIconOnly onPress={toggleSidebar}><IconMenu2 /></Button>;
}
