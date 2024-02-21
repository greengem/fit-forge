"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalState {
  isOpen: boolean;
  title?: ReactNode;
  content?: ReactNode;
}

interface ModalContextType {
  modals: { [key: string]: ModalState };
  activeModalKey: string | null;
  openModal: (
    key: string,
    state: { title?: ReactNode; content: ReactNode },
  ) => void;
  closeModal: (key: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modals, setModals] = useState<{ [key: string]: ModalState }>({});
  const [activeModalKey, setActiveModalKey] = useState<string | null>(null);

  const openModal = (
    key: string,
    state: { title?: ReactNode; content: ReactNode },
  ) => {
    setModals((prev) => ({ ...prev, [key]: { ...state, isOpen: true } }));
    setActiveModalKey(key);
  };

  const closeModal = (key: string) => {
    setModals((prev) => ({ ...prev, [key]: { ...prev[key], isOpen: false } }));
    setActiveModalKey(null);
  };

  const contextValue = {
    modals,
    activeModalKey,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
