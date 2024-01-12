import { LhsSidebar } from '@/components/LHS/Sidebar';
import Page from '@/components/Main/Page';
import Navbar from '@/components/Navbar/Navbar';
import SidebarContext, { SidebarContextProps } from '@/components/Providers/SidebarProvider';
import CharactersContext, { CharactersProviderProps } from '@/components/Providers/CharactersProvider';
import { GetCharacterInfo, SpecificMemberId, GetToken, GetVerboseInformation, ItemInstance, GetItem } from '@/components/Destiny/Fetch';
import ChosenCharacterContext, { ChosenCharacterProps } from '@/components/Providers/ChosenCharacterProvider';
import VerboseContext from '@/components/Providers/VerboseCharactersProvider';
import TokenContext from '@/components/Providers/TokenProvider';

import { 
    useState,
    useEffect
} from 'react';
import { LoadingScreen } from '@/components/Main/LoadingScreen';

export const HomePage = () => {
    const [ sidebarOpen, setSidebarOpen ] = useState<boolean>(true);
    const [ characters, updateCharacters ] = useState([]);
    const [ chosenCharacter, updateChosenCharacter] = useState<string>("");
    
    const [ verbose, updateVerbose ] = useState({});
    const [ inventory, updateInventory ] = useState([]);
    const [ equipped, updateEquipped ] = useState([]);

    const [ token, updateToken ] = useState<string>("");
    const [ hasToken, setHasToken ] = useState<boolean>(false);
    const [ membershipId, updateMemberId ] = useState<string>("");
    const [ invLoading, setInvLoading ] = useState<boolean>(true);

    const sidebarValue: SidebarContextProps = {
        sidebarOpen,
        toggleSidebar: () => setSidebarOpen(!sidebarOpen)
    };

    useEffect(() => {
        const getAuthToken = async () => {
            GetToken().then(authToken => {
                if (authToken && authToken["refresh_token"]) {
                    console.log(authToken);
            
                    updateToken(authToken["refresh_token"].toString());
                    SpecificMemberId(authToken["membership_id"].toString()).then(membershipId => {
                        updateMemberId(membershipId);

                        setHasToken(true);
                    });
                }
            });
        }

        getAuthToken();
    }, []);

    useEffect(() => {
        const fetchCharacters = async () => {
            const charactersData = await GetCharacterInfo(membershipId);
            updateCharacters(charactersData);
        };

        fetchCharacters();
    }, [hasToken]);

    useEffect(() => {
        const invPromises = [];

        const preloadInventory = async () => {
            const promises = [];

            setInvLoading(true);

            const verboseData = await GetVerboseInformation(membershipId);
            updateVerbose(verboseData);

            // console.log(verboseData);
            
            for (let i in verboseData["Response"]["characterInventories"]["data"]) {
                for (let j in verboseData["Response"]["characterInventories"]["data"][i]["items"]) {

                    if (typeof verboseData["Response"]["characterInventories"]["data"][i]["items"][j]["itemInstanceId"] !== "undefined") {
                        const promise = ItemInstance(membershipId, verboseData["Response"]["characterInventories"]["data"][i]["items"][j]["itemInstanceId"]).then(k => {
                            // console.log(k);

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

            setInvLoading(false);
        }

        if (hasToken) {
            preloadInventory();
        }

    }, [hasToken]);

    useEffect(() => {
        const fetchVerbose = async () => {
            const verboseData = await GetVerboseInformation(membershipId);
            updateVerbose(verboseData);
        }

        if (hasToken) {
            fetchVerbose();
        }
    }, [hasToken]);

    return (
        <div>
            <TokenContext.Provider value={{ token, setToken: updateToken, membershipId, setMemberId: updateMemberId }}>
                <SidebarContext.Provider value={sidebarValue}>
                    <CharactersContext.Provider value={{ characters, updateCharacters }}>
                        <ChosenCharacterContext.Provider value={{ chosenCharacter, setChosenCharacter: updateChosenCharacter }}>
                            <VerboseContext.Provider value={{ verbose, inventory, equipped, updateVerbose, updateInventory, updateEquipped }}>
                                {invLoading ? 
                                    <div>
                                        <LoadingScreen />
                                    </div> : <div>
                                        <Navbar />
                                        <Page />
                                        <LhsSidebar />
                                    </div>
                                }
                            </VerboseContext.Provider>
                        </ChosenCharacterContext.Provider>
                    </CharactersContext.Provider>
                </SidebarContext.Provider>
            </TokenContext.Provider>
        </div>
    )
}

export default HomePage;