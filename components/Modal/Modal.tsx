"use client";
import React from "react";
import { useModal } from "@/contexts/ModalContext";
import {
  Modal as NextUIModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

export default function Modal() {
  const { modals, closeModal, activeModalKey } = useModal();

  const isActiveModalPresent = activeModalKey !== null;
  const modalState = isActiveModalPresent ? modals[activeModalKey] : undefined;

  const onClose = () => {
    if (activeModalKey) closeModal(activeModalKey);
  };

  if (!isActiveModalPresent || !modalState || !modalState.isOpen) return null;

  const { title, content } = modalState;

  return (
    <NextUIModal
      isOpen={modalState.isOpen}
      backdrop="blur"
      onOpenChange={onClose}
      size="3xl"
      isKeyboardDismissDisabled
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button onPress={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </NextUIModal>
  );
}
