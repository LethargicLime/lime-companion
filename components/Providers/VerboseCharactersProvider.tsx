import { createContext, useState } from 'react';

export interface VerboseCharactersProviderProps {
    verbose: any;
    inventory: any;
    equipped: any;
    updateVerbose: (verbose: any) => void;
    updateInventory: (inventory: any) => void;
    updateEquipped: (equipped: any) => void;
}

export const VerboseContext = createContext<VerboseCharactersProviderProps>({
    verbose: {},
    equipped: {},
    inventory: {},
    updateVerbose: () => {},
    updateInventory: () => {},
    updateEquipped: () => {}
});

export default VerboseContext;