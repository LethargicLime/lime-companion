import { createContext, useState } from 'react';

export interface VerboseCharactersProviderProps {
    verbose: any;
    updateVerbose: (verbose: any) => void;
}

export const VerboseContext = createContext<VerboseCharactersProviderProps>({
    verbose: {},
    updateVerbose: () => {}
});

export default VerboseContext;