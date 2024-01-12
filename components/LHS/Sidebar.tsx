import { OpenSidebarButton, CloseSidebarButton } from './OpenCloseButton';
import SettingsMenu from './SettingsButton';
import SignOut from './SignOut';
import ReloadManifest from './ReloadManifest';
import ReloadCharacters from './ReloadCharacters';
import { GetCharacterInfo, GetVerboseInformation, GetToken, ItemInstance, GetItem } from '../Destiny/Fetch';
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
import TokenContext from '../Providers/TokenProvider';


export const LhsSidebar = () => {
    const { characters, updateCharacters } = useContext(CharactersContext);
    const { sidebarOpen, toggleSidebar } = useContext(SidebarContext);
    const { chosenCharacter, setChosenCharacter } = useContext(ChosenCharacterContext);
    const { verbose, inventory, equipped, updateVerbose, updateInventory, updateEquipped } = useContext(VerboseContext);
    const { token, membershipId } = useContext(TokenContext);
    const [dataFetched, setDataFetched] = useState(false);

    const characterInfo = () => {
        GetCharacterInfo(membershipId).then((characters) => {
            updateCharacters(characters);
        });
    }

    const invPromises = [];
    const promises = [];

    useEffect(() => {
        const fetchCharacterInfo = async () => {

            const characters = await GetCharacterInfo(membershipId);
            const verboseData = await GetVerboseInformation(membershipId);

            // console.log(verboseData);

            for (let i in verboseData["Response"]["characterInventories"]["data"]) {
                for (let j in verboseData["Response"]["characterInventories"]["data"][i]["items"]) {

                    if (typeof verboseData["Response"]["characterInventories"]["data"][i]["items"][j]["itemInstanceId"] !== "undefined") {
                        const promise = ItemInstance(membershipId, verboseData["Response"]["characterInventories"]["data"][i]["items"][j]["itemInstanceId"]).then(k => {
                            k["character"] = i;

                            for (let l in verboseData["Response"]["characterInventories"]["data"][i]["items"][j]) {
                                // console.log(verboseData["Response"]["characterInventories"]["data"][i]["items"][j]);
                                k[l] = verboseData["Response"]["characterInventories"]["data"][i]["items"][j][l];
                            }

                            invPromises.push(k);
                        });

                        promises.push(promise);
                    }
                }
            }

            await Promise.all(promises);

            for (let i in invPromises) {
                GetItem(invPromises[i]["itemHash"]).then(j => {
                    // console.log(j);
                    for (let k in j) {
                        invPromises[i][k] = j[k];
                    }
                });
            }

            updateInventory(invPromises);

            const equipTemp = [];
            const promiseEquip = [];

            for (let i in verboseData["Response"]["characterEquipment"]["data"]) {
                for (let j in verboseData["Response"]["characterEquipment"]["data"][i]["items"]) {
                    if (typeof verboseData["Response"]["characterEquipment"]["data"][i]["items"][j]["itemInstanceId"] !== "undefined") {
                        // console.log(verboseData["Response"]["characterEquipment"]["data"][i]["items"][j])

                        ((j) => {
                            const promise = ItemInstance(membershipId, verboseData["Response"]["characterEquipment"]["data"][i]["items"][j]["itemInstanceId"]).then(k => {
                                k["character"] = i;
                                
                                for (let l in verboseData["Response"]["characterEquipment"]["data"][i]["items"][j]) {
                                    k[l] = verboseData["Response"]["characterEquipment"]["data"][i]["items"][j][l];
                                }
            
                                equipTemp.push(k);
                            });
            
                            promiseEquip.push(promise);
                        })(j);
                    }
                }
            }

            await Promise.all(promiseEquip);

            // console.log(equipTemp);

            for (let i in equipTemp) {
                GetItem(equipTemp[i]["itemHash"]).then(j => {
                    // console.log(equipTemp[i]);
                    // console.log(j);
                    for (let k in j) {
                        equipTemp[i][k] = j[k];
                    }
                });
            }
            

            updateEquipped(equipTemp);

            updateCharacters(characters);
            updateVerbose(verboseData);
            setDataFetched(true);
        };

        if (!dataFetched) {
            fetchCharacterInfo();
        }
    }, [membershipId, verbose, characters, dataFetched]);

    const getEmblem = (key: string) => {
        return "https://bungie.net" + characters[key as keyof Object]["emblemBackgroundPath" as keyof Object];
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
            <SignOut />
            
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
            {/* <ReloadManifest /> */}
            <SettingsMenu />

            <CloseSidebarButton onClick={() => toggleSidebar(!sidebarOpen)} />
        </div>
    )
}
