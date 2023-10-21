import { OpenSidebarButton, CloseSidebarButton } from './OpenCloseButton';
import SettingsMenu from './SettingsButton';
import Login from './Login';
import ReloadManifest from './ReloadManifest';
import ReloadCharacters from './ReloadCharacters';
import { GetCharacterInfo, GetVerboseInformation } from '../Destiny/Fetch';
import { SidebarImageButton } from './SidebarImageButton';
import SidebarContext, { SidebarContextProps } from '../Providers/SidebarProvider';
import CharactersContext from '../Providers/CharactersProvider';
import ChosenCharacterContext from '../Providers/ChosenCharacterProvider';
import VerboseContext from '../Providers/VerboseCharactersProvider';

import { 
    useState,
    useEffect,
    useContext
} from 'react';


export const LhsSidebar = () => {
    const { characters, updateCharacters } = useContext(CharactersContext);
    const { sidebarOpen, toggleSidebar } = useContext(SidebarContext);
    const { chosenCharacter, setChosenCharacter } = useContext(ChosenCharacterContext);
    const { verbose, updateVerbose } = useContext(VerboseContext);
    const [dataFetched, setDataFetched] = useState(false);

    const characterInfo = () => {
        GetCharacterInfo().then((characters) => {
            updateCharacters(characters)
        });
        GetVerboseInformation().then((verbose) => {
            updateVerbose(verbose);
        });
    }

    useEffect(() => {
        const fetchCharacterInfo = async () => {
            const characters = await GetCharacterInfo();
            const verbose = await GetVerboseInformation();

            updateCharacters(characters);
            updateVerbose(verbose);
            setDataFetched(true);
        };

        if (!dataFetched) {
            fetchCharacterInfo();
        }
    }, [verbose, characters, dataFetched]);

    const getEmblem = (key: string) => {
        return "http://bungie.net" + characters[key as keyof Object]["emblemBackgroundPath" as keyof Object];
    }

    const getClass = (key: string) => {
        const charClass: any = characters[key as keyof Object]["classType" as keyof Object];
        if (charClass == "0") {
            return "Titan";
        }
        else if (charClass == "1") {
            return "Hunter";
        }
        return "Warlock";
    }

    const getRace = (key: string) => {
        const race: any = characters[key as keyof Object]["raceType" as keyof Object];
        if (race == "0") {
            return "Human";
        } else if (race == "1") {
            return "Awoken";
        }
        return "Exo";
    }

    return (
        <div className={`fixed top-0 left-0 z-40 flex h-full w-[330px] flex-none flex-col space-y-2 p-2 duration-1000 sidebar ${sidebarOpen ? "" : "sidebar-closed"}`}>
            <Login />
            
            <div className="flex-grow flex-grow-1 overflow-auto">
                {Object.keys(characters).map((key: any, i: any) => (
                    <SidebarImageButton key={key} 
                        text={getClass(key)}
                        race={getRace(key)}
                        light={characters[key as keyof Object]["light" as keyof Object]}
                        image={getEmblem(key)}
                        onClick={() => setChosenCharacter(key)}
                    />
                ))}
            </div>

            <div onClick={() => {
                characterInfo();
                setDataFetched(false);
            }}>
                <ReloadCharacters />
            </div>
            <ReloadManifest />
            <SettingsMenu />

            <CloseSidebarButton onClick={() => toggleSidebar(!sidebarOpen)} />
        </div>
    )
}
