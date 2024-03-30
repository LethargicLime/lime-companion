import { createContext, useState } from 'react';

export interface VerboseCharactersProviderProps {
    verbose: any;
    inventory: any;
    equipped: any;
    vault: any;
    divHeight: any,
    updateVerbose: (verbose: any) => void;
    updateInventory: (inventory: any) => void;
    updateEquipped: (equipped: any) => void;
    updateVault: (vault: any) => void;
}

export const VerboseContext = createContext<VerboseCharactersProviderProps>({
    verbose: {},
    equipped: {},
    inventory: {},
    vault: {},
    divHeight: {},
    updateVerbose: () => {},
    updateInventory: () => {},
    updateEquipped: () => {},
    updateVault: () => {}
});

export default VerboseContext;