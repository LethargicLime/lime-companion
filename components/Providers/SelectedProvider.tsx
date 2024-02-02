import { createContext } from "react";

export interface SelectedContextProps {
    item: any;
    setItem: (item: any) => void;
}

export const SelectedContext = createContext<SelectedContextProps>({
    item: {},
    setItem: () => {}
});

export default SelectedContext;