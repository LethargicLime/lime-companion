import CharactersContext from '../Providers/CharactersProvider'
import ChosenCharacterContext from '../Providers/ChosenCharacterProvider';
import { GetItem, ItemInstance } from '../Destiny/Fetch';
import VerboseContext from '../Providers/VerboseCharactersProvider';
import TokenContext from '../Providers/TokenProvider';

import Image from 'next/image';

import {
    useState,
    useEffect,
    useContext
} from 'react';

export const CharacterInventory = () => {
    const { chosenCharacter } = useContext(ChosenCharacterContext);
    const { characters, updateCharacters } = useContext(CharactersContext);
    const { verbose } = useContext(VerboseContext);
    const { token, membershipId } = useContext(TokenContext);

    const [ itemHashes, updateItemHashes ] = useState<any[]>([]);
    const [ items, setItem ] = useState<any>([]);
    const [ inventory, setInventory ] = useState<any>([]);

    const [ KineticInv, setKineticInv ] = useState<any[]>([]);
    const [ EnergyInv, setEnergyInv ] = useState<any[]>([]);

    const [ isLoading, setIsLoading ] = useState(true);
    const [ opacity, setOpacity ] = useState(1);

    // animation for character change
    useEffect(() => {
        setOpacity(.25);
        const timer = setTimeout(() => setOpacity(1), 250);
        return () => clearTimeout(timer);
    }, [chosenCharacter]);

    // update all info when character info changes
    useEffect(() => {
        setIsLoading(true);
    
        if (verbose && verbose["Response"]) {
            if (verbose["Response"]["characterEquipment"]["data"][chosenCharacter] && verbose["Response"]["characterEquipment"]["data"][chosenCharacter]["items"]) {
                updateItemHashes(verbose["Response"]["characterEquipment"]["data"][chosenCharacter]["items"]);

                setInventory(verbose["Response"]["characterInventories"]["data"][chosenCharacter]["items"]);
                
                setIsLoading(false);
            }
        }

        const fetchInventoryInfo = async () => {
            var kInvTemp = [];
            console.log(inventory)
            for (var i in inventory) {                
                if (typeof inventory[i]["itemInstanceId"] !== "undefined") {
                    const k = await ItemInstance(membershipId, inventory[i]["itemInstanceId"]);
    
                    // console.log(k);

                    if (k["damageType"] == 1) {
                        kInvTemp.push(k);
                    }
                }
                
            }
            setKineticInv(kInvTemp);
        }
        
        fetchInventoryInfo();

    }, [verbose, chosenCharacter, characters]);

    // handle inventory
    useEffect(() => {
        

    }, [inventory, chosenCharacter])

    // get item info when items change
    useEffect(() => {
        const fetchItems = async () => {
            if (itemHashes.length > 0) {
                const promises = itemHashes.map(itemHash => GetItem(itemHash["itemHash"]));
                var fetchedItems = await Promise.all(promises);

                const promiseInstance = itemHashes.map(instanceId => ItemInstance(membershipId, instanceId["itemInstanceId"]));
                const itemInstances = await Promise.all(promiseInstance);
                
                for (var i in fetchedItems) {
                    Object.assign(fetchedItems[i], itemInstances[i])
                }

                setItem(fetchedItems);
            }
        };
    
        fetchItems();
    }, [itemHashes]);

    if (isLoading) {
        return <div style={{ 
            paddingLeft: "45px",
            paddingTop: "30px",
            fontWeight: "700",
            //textAlign: "center"
        }}>
            Select a character
        </div>;
    }

    return (
        <div className="" style={{ 
            paddingLeft: "45px",
            paddingTop: "30px",
            fontWeight: "700",
            opacity: opacity,
            transition: 'opacity 0.25s ease-out',
        }}>
            {items.length > 0 ? 
            <div>
                {Array(3).fill(0).map((_, i) => (
                    <div style={{ display: "flex", marginBottom: "20px" }} key={i}>
                        <div style={{ display: "inline-block"}}>
                            <div style={{
                                position: "relative"
                            }}>
                                <Image
                                    src={`https://bungie.net${items[i]["displayProperties"]["icon"]}`}
                                    width={70}
                                    height={70}
                                    alt="Kinetic"
                                    className="gear-icon"
                                />
                                <Image 
                                    src={`https://bungie.net${items[i]["iconWatermark"]}`}
                                    width={70}
                                    height={70}
                                    className="watermark"
                                    alt="Watermark"
                                    style={{ position: 'absolute', top: 0, left: 0 }}
                                />
                            </div>
                            <div style={{ 
                                height: "14px",
                                fontSize: "10px",
                                fontWeight: "700",
                                backgroundColor: "#3d3d3d",
                                color: "white", 
                                display: "flex", 
                                alignItems: "center",
                                opacity: "",
                                justifyContent: "center",
                            }}>{items[i]["primaryStat"]["value"]}</div>
                        </div>
                        <div style={{ 
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 60px)",
                            gridGap: '1px', 
                            marginLeft: '14px',
                        }}>
                            {Array(KineticInv.length).fill(0).map((_, j) => (
                                <Image
                                    key={j}
                                    src={`https://bungie.net${items[i]["displayProperties"]["icon"]}`}
                                    width={55}
                                    height={55}
                                    alt="Kinetic"
                                    className="gear-icon"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            : ""}
            
        </div>
    )
}