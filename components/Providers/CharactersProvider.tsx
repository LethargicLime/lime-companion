import { createContext, useState } from 'react';

export interface CharactersProviderProps {
    characters: any;
    updateCharacters: (characters: any) => void;
}

export const CharactersContext = createContext<CharactersProviderProps>({
    characters: {},
    updateCharacters: () => {}
});

export default CharactersContext;