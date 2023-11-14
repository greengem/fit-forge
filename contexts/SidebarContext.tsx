import React, { useState, createContext, useContext, ReactNode } from 'react';

interface SidebarContextType {
  isSidebarVisible: boolean;
  toggleSidebar: () => void;
}

const SidebarVisibilityContext = createContext<SidebarContextType>({
  isSidebarVisible: true,
  toggleSidebar: () => {},
});

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <SidebarVisibilityContext.Provider value={{ isSidebarVisible, toggleSidebar }}>
      {children}
    </SidebarVisibilityContext.Provider>
  );
};

export const useSidebarVisibility = (): SidebarContextType => {
  return useContext(SidebarVisibilityContext);
};
