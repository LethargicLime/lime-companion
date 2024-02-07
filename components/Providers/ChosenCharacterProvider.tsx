import { createContext, useState } from 'react';

export interface ChosenCharacterProps {
    chosenCharacter: string;
    secondaryCharacter: string;
    thirdOption: string;
    setChosenCharacter: (chosenCharacter: string) => void;
    setSecondaryCharacter: (secondaryCharacter: string) => void;
    setThirdOption: (thirdOption: string) => void;
}

export const ChosenCharacterContext = createContext<ChosenCharacterProps>(undefined!);

export default ChosenCharacterContext;