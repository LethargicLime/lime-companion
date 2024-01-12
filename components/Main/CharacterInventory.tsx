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

import { Popup } from './Popup';

import CraftedIcon from "@/public/PatternIcon.jpg";

export const CharacterInventory = () => {
    const { chosenCharacter } = useContext(ChosenCharacterContext);
    const { characters, updateCharacters } = useContext(CharactersContext);
    const { verbose, inventory, equipped } = useContext(VerboseContext);
    const { token, membershipId } = useContext(TokenContext);

    const [ hash, setHash ] = useState<any>([]);
    const [ prevHash, setPrevHash ] = useState<any>([]);
    const [ revealed, setRevealed ] = useState<boolean>(false);
    const [ coords, setCoords ] = useState<any>([0, 0]);

    const [ itemHashes, updateItemHashes ] = useState<any[]>([]);
    const [ items, setItem ] = useState<any>([]);

    const [ isLoading, setIsLoading ] = useState(true);
    const [ opacity, setOpacity ] = useState(1);

    const handleIconClick = (info: any) => {

        console.log(info)

        const handleMouse = (e) => {
            if (revealed !== false) {
                console.log(revealed)
                setCoords([e.clientX, e.clientY])
            }
        }

        window.addEventListener("mousedown", handleMouse);

        if (info === prevHash) {
            setRevealed(!revealed);
        } else {
            setRevealed(true);
        }

        console.log(coords);
        setPrevHash(info);
    }


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
                
                setIsLoading(false);
            }
        }

    }, [verbose, chosenCharacter, characters]);

    const [ CurrentLoadout, setCurrentLoadout ] = useState<any[]>([]);
    const [ CurrentInventory, setCurrentInventory ] = useState<any[][]>([]);

    // handle inventory
    useEffect(() => {
        const fetchInventoryInfo = async () => {
            let tempLoadout = [...CurrentLoadout];
            let tempInv = [...CurrentInventory];

            for (let i in equipped) {
                if (equipped[i]["character"] === chosenCharacter) {
                    if (equipped[i]["bucketHash"] === 1498876634) {
                        tempLoadout[0] = equipped[i];
                    }
                    if (equipped[i]["bucketHash"] === 2465295065) {
                        tempLoadout[1] = equipped[i];
                    }
                    if (equipped[i]["bucketHash"] === 953998645) {
                        tempLoadout[2] = equipped[i];
                    }
                }
            }

            setCurrentLoadout(tempLoadout);

            let kInvTemp = [];
            let sInvTemp = [];
            let hInvTemp = [];

            for (let i in inventory) {                
                // console.log(inventory[i]);

                if (inventory[i]["character"] === chosenCharacter) {
                    if (inventory[i]["bucketHash"] === 1498876634) {                        
                        kInvTemp.push(inventory[i]);
                    }
                    if (inventory[i]["bucketHash"] === 2465295065) {                        
                        sInvTemp.push(inventory[i]);
                    }
                    if (inventory[i]["bucketHash"] === 953998645) {
                        hInvTemp.push(inventory[i]);
                    }
                }
            }

            tempInv[0] = kInvTemp;
            tempInv[1] = sInvTemp;
            tempInv[2] = hInvTemp;
            // console.log(tempInv);

            setCurrentInventory(tempInv);
        }
        
        fetchInventoryInfo();

    }, [chosenCharacter]);

    // get item info when items change
    useEffect(() => {
        const fetchItems = async () => {
            if (itemHashes.length > 0) {
                const promises = itemHashes.map(itemHash => GetItem(itemHash["itemHash"]));
                let fetchedItems = await Promise.all(promises);

                const promiseInstance = itemHashes.map(instanceId => ItemInstance(membershipId, instanceId["itemInstanceId"]));
                const itemInstances = await Promise.all(promiseInstance);
                
                for (let i in fetchedItems) {
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
            color: "white",
            fontWeight: "700",
            //textAlign: "center"
        }}>
            Select a character
        </div>;
    }

    // console.log(CurrentLoadout);

    return (
        <>
        {revealed ? 
            <div className={`z-10`} style={{
                
            }}>
                {/* <Popup
                    left={coords[0]}
                    top={coords[1]}
                /> */}
            </div> : ""}
        <div className="z-0" style={{ 
            paddingLeft: "45px",
            paddingTop: "30px",
            fontWeight: "700",
            opacity: opacity,
            transition: 'opacity 0.25s ease-out',
        }}>
            {CurrentLoadout.length > 0 && CurrentInventory.length > 0 ? 
            <div>
                {Array(3).fill(0).map((_, i) => (
                    <div style={{ display: "flex", marginBottom: "30px" }} key={i}>
                        <div style={{ display: "inline-block"}}>
                            <div onClick={() => handleIconClick(CurrentLoadout[i])} className={CurrentLoadout[i]["state"] == 4 ? "masterwork-icon" : "gear-icon"} style={{
                                position: "relative"
                            }}>
                                <Image 
                                    src={`https://bungie.net${CurrentLoadout[i]["iconWatermark"]}`}
                                    width={70}
                                    height={70}
                                    className="watermark"
                                    alt="Watermark"
                                    style={{ position: 'absolute', top: 0, left: 0 }}
                                />
                                {CurrentLoadout[i]["overrideStyle"] ? 
                                <Image
                                    src={`https://bungie.net${CurrentLoadout[i]["overrideStyle"]["displayProperties"]["icon"]}`}
                                    width={70}
                                    height={70}
                                    alt="Primary"
                                /> : 
                                <Image
                                    src={`https://bungie.net${CurrentLoadout[i]["displayProperties"]["icon"]}`}
                                    width={70}
                                    height={70}
                                    alt="Primary"
                                />}
                                {CurrentLoadout[i]["state"] == 8 ? 
                                <div className="" style={{
                                    marginTop: "-17px", 
                                    marginLeft: "3px",
                                    position: "absolute",
                                }}>
                                    <Image 
                                        src={CraftedIcon}
                                        width={14}
                                        height={14}
                                        alt="Crafted Icon"
                                    />
                                </div> : ""}
                            </div>
                            <div className="" style={{
                                height: "14px",
                                fontSize: "10px",
                                fontWeight: "700",
                                backgroundColor: "#3d3d3d",
                                color: "white", 
                                display: "flex", 
                                alignItems: "center",
                                opacity: "",
                                justifyContent: "center",
                            }}>
                                <Image 
                                    src={`https://bungie.net${CurrentLoadout[i]["damageInformation"]["displayProperties"]["icon"]}`}
                                    width={11}
                                    height={11}
                                    alt="Damage Type"
                                />
                                <span className="pl-1">{CurrentLoadout[i]["primaryStat"]["value"]}</span>
                            </div>
                        </div>

                        <div style={{ 
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 60px)",
                            gridGap: "5px", 
                            marginLeft: "14px",
                        }}>
                            {Array(CurrentInventory[i].length).fill(0).map((_, j) => (
                                <div key={j} style={{ display: "inline-block" }}>
                                    <div className={CurrentInventory[i][j]["state"] == 4 ? "masterwork-icon" : "gear-icon"} style={{
                                        position: "relative"
                                    }}>
                                        <Image 
                                            src={`https://bungie.net${CurrentInventory[i][j]["iconWatermark"]}`}
                                            width={70}
                                            height={70}
                                            className="watermark"
                                            alt="Watermark"
                                            style={{ position: 'absolute', top: 0, left: 0 }}
                                        />
                                        {CurrentInventory[i][j]["overrideStyle"] ? 
                                        <Image
                                            src={`https://bungie.net${CurrentInventory[i][j]["overrideStyle"]["displayProperties"]["icon"]}`}
                                            width={70}
                                            height={70}
                                            alt="Primary"
                                        /> : 
                                        <Image
                                            src={`https://bungie.net${CurrentInventory[i][j]["displayProperties"]["icon"]}`}
                                            width={70}
                                            height={70}
                                            alt="Primary"
                                        />}
                                        {CurrentInventory[i][j]["state"] == 8 ? 
                                        <div className="" style={{
                                            marginTop: "-17px", 
                                            marginLeft: "3px",
                                            position: "absolute",
                                        }}>
                                            <Image 
                                                src={CraftedIcon}
                                                width={14}
                                                height={14}
                                                alt="Crafted Icon"
                                            />
                                        </div> : ""}
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
                                    }}>
                                        <Image 
                                            src={`https://bungie.net${CurrentInventory[i][j]["damageInformation"]["displayProperties"]["icon"]}`}
                                            width={11}
                                            height={11}
                                            alt="Damage Type"
                                        />
                                        <span className="pl-1">{CurrentInventory[i][j]["primaryStat"]["value"]}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            : ""}
            
        </div>
        </>
    )
}