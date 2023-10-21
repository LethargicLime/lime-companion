import { createContext, useState } from 'react';

export interface ChosenCharacterProps {
    chosenCharacter: string;
    setChosenCharacter: (chosenCharacter: string) => void;
}

export const ChosenCharacterContext = createContext<ChosenCharacterProps>(undefined!);

export default ChosenCharacterContext;