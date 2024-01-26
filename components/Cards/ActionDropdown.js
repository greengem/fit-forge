"use client";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { IconMenu2 } from "@tabler/icons-react";

function ActionDropdown({ onAction, routine }) {
    return (
        <Dropdown>
            <DropdownTrigger>
                <Button color="primary" variant="light" isIconOnly size="sm"><IconMenu2 /></Button>
            </DropdownTrigger>
            <DropdownMenu color="primary" aria-label="Routine Actions" onAction={(key) => onAction(key, routine)}>
                <DropdownItem key="edit">Edit Routine</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">Delete Routine</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default ActionDropdown;
