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
    divHeight: {
        1498876634: 0,      // kinetic
        2465295065: 0,      // energy
        953998645: 0,       // power
        3448274439: 0,      // helment
        3551918588: 0,      // gauntlets
        14239492: 0,        // chest
        20886954: 0,        // legs
        1585787867: 0,      // class item
    },
    updateVerbose: () => {},
    updateInventory: () => {},
    updateEquipped: () => {},
    updateVault: () => {}
});

export default VerboseContext;