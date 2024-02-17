'use client'
import React, { useState, createContext, useContext, ReactNode } from 'react';

interface SidebarContextType {
  isSidebarVisible: boolean;
  isSlim: boolean;
  toggleSidebar: () => void;
  toggleSlim: () => void;
}

const SidebarVisibilityContext = createContext<SidebarContextType>({
  isSidebarVisible: true,
  isSlim: false,
  toggleSidebar: () => {},
  toggleSlim: () => {},
});

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isSlim, setSlim] = useState(false); // State for slim mode

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const toggleSlim = () => {
    setSlim(!isSlim);
  };

  return (
    <SidebarVisibilityContext.Provider value={{ isSidebarVisible, toggleSidebar, isSlim, toggleSlim }}>
      {children}
    </SidebarVisibilityContext.Provider>
  );
};

export const useSidebarVisibility = (): SidebarContextType => {
  return useContext(SidebarVisibilityContext);
};
