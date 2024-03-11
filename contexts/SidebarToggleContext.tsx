"use client";
import React, { useState, useContext } from "react";

interface SidebarToggleContextProps {
  sidebarCollapse: boolean;
  toggleSidebar: () => void;
}

const SidebarToggleContext = React.createContext<
  SidebarToggleContextProps | undefined
>(undefined);

export const useSidebarToggleContext = () => {
  const context = useContext(SidebarToggleContext);
  if (!context) {
    throw new Error(
      "useSidebarToggleContext must be used within a SidebarToggleProvider",
    );
  }
  return context;
};

export function SidebarToggleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapse, setSidebarCollapse] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapse(!sidebarCollapse);
  };

  return (
    <SidebarToggleContext.Provider value={{ sidebarCollapse, toggleSidebar }}>
      {children}
    </SidebarToggleContext.Provider>
  );
}
