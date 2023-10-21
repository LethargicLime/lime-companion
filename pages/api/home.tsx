import { LhsSidebar } from '@/components/LHS/Sidebar';
import Page from '@/components/Main/Page';
import Navbar from '@/components/Navbar/Navbar';
import SidebarContext, { SidebarContextProps } from '@/components/Providers/SidebarProvider';
import CharactersContext, { CharactersProviderProps } from '@/components/Providers/CharactersProvider';
import { GetCharacterInfo, GetVerboseInformation } from '@/components/Destiny/Fetch';
import ChosenCharacterContext, { ChosenCharacterProps } from '@/components/Providers/ChosenCharacterProvider';
import VerboseContext from '@/components/Providers/VerboseCharactersProvider';

import { 
    useState,
    useEffect
} from 'react';

export const HomePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [characters, updateCharacters] = useState([]);
    const [chosenCharacter, updateChosenCharacter] = useState<string>("");
    const [verbose, updateVerbose] = useState([]);

    const sidebarValue: SidebarContextProps = {
        sidebarOpen,
        toggleSidebar: () => setSidebarOpen(!sidebarOpen)
    };

    useEffect(() => {
        const fetchCharacters = async () => {
            const charactersData = await GetCharacterInfo();
            updateCharacters(charactersData);
        };

        fetchCharacters();
    }, []);

    useEffect(() => {
        const fetchVerbose = async () => {
            const verboseData = await GetVerboseInformation();
            updateVerbose(verboseData);
        }

        fetchVerbose();
    }, []);

    return (
        <div>
            <SidebarContext.Provider value={sidebarValue}>
                <CharactersContext.Provider value={{ characters, updateCharacters }}>
                    <ChosenCharacterContext.Provider value={{ chosenCharacter, setChosenCharacter: updateChosenCharacter}}>
                        <VerboseContext.Provider value={{ verbose, updateVerbose }}>
                            <LhsSidebar />
                            <div>
                                <Navbar />
                                <Page />
                            </div>
                        </VerboseContext.Provider>
                    </ChosenCharacterContext.Provider>
                </CharactersContext.Provider>
            </SidebarContext.Provider>
        </div>
    )
}

export default HomePage;