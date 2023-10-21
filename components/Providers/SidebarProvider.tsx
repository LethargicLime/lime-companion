import { createContext, useState } from 'react';

export interface SidebarContextProps {
    sidebarOpen: boolean;
    toggleSidebar: (sidebarOpen: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextProps>(undefined!);

export default SidebarContext;