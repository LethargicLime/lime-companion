import { LhsSidebar } from '@/components/LHS/Sidebar';
import Page from '@/components/Main/Page';
import Navbar from '@/components/Navbar/Navbar';
import SidebarContext, { SidebarContextProps } from '@/components/Providers/SidebarProvider';
import CharactersContext, { CharactersProviderProps } from '@/components/Providers/CharactersProvider';
import { GetCharacterInfo, SpecificMemberId, GetToken, GetVerboseInformation } from '@/components/Destiny/Fetch';
import ChosenCharacterContext, { ChosenCharacterProps } from '@/components/Providers/ChosenCharacterProvider';
import VerboseContext from '@/components/Providers/VerboseCharactersProvider';
import TokenContext from '@/components/Providers/TokenProvider';

import { 
    useState,
    useEffect
} from 'react';

export const HomePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [characters, updateCharacters] = useState([]);
    const [chosenCharacter, updateChosenCharacter] = useState<string>("");
    const [verbose, updateVerbose] = useState([]);
    const [token, updateToken] = useState<string>("");
    const [membershipId, updateMemberId] = useState<string>("");

    const sidebarValue: SidebarContextProps = {
        sidebarOpen,
        toggleSidebar: () => setSidebarOpen(!sidebarOpen)
    };

    useEffect(() => {
        const getAuthToken = async () => {
            const authToken = await GetToken();

            if (authToken && authToken["refresh_token"]) {
                console.log(await authToken);

                updateToken(authToken["refresh_token"].toString());
                updateMemberId(await SpecificMemberId(authToken["membership_id"].toString()));
            }
        }

        const preload = async () => {
            
        }

        getAuthToken();
    }, []);

    useEffect(() => {
        const fetchCharacters = async () => {
            const charactersData = await GetCharacterInfo(membershipId);
            updateCharacters(charactersData);
        };

        fetchCharacters();
    }, [membershipId]);

    useEffect(() => {
        const fetchVerbose = async () => {
            const verboseData = await GetVerboseInformation(membershipId);
            updateVerbose(verboseData);
        }

        fetchVerbose();
    }, [membershipId]);

    return (
        <div>
            <TokenContext.Provider value={{ token, setToken: updateToken, membershipId, setMemberId: updateMemberId }}>
                <SidebarContext.Provider value={sidebarValue}>
                    <CharactersContext.Provider value={{ characters, updateCharacters }}>
                        <ChosenCharacterContext.Provider value={{ chosenCharacter, setChosenCharacter: updateChosenCharacter }}>
                            <VerboseContext.Provider value={{ verbose, updateVerbose }}>
                                <Navbar />
                                <Page />
                                <LhsSidebar />
                            </VerboseContext.Provider>
                        </ChosenCharacterContext.Provider>
                    </CharactersContext.Provider>
                </SidebarContext.Provider>
            </TokenContext.Provider>
        </div>
    )
}

export default HomePage;