import { createContext } from "react";

export interface LoadoutsContextProps {
    loadouts: Object[];
    handleLoadoutChange: () => void;
}

export const LoadoutContext = createContext<LoadoutsContextProps>(undefined!);

export default LoadoutContext;