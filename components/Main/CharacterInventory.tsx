import CharactersContext from '../Providers/CharactersProvider'
import ChosenCharacterContext from '../Providers/ChosenCharacterProvider';
import { GetItem } from '../Destiny/Fetch';
import VerboseContext from '../Providers/VerboseCharactersProvider';
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

    const [itemHashes, updateItemHashes] = useState<any[]>([]);
    const [items, setItem] = useState<any>([]);
    const [ inventory, setInventory ] = useState<any>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        setOpacity(.25);
        const timer = setTimeout(() => setOpacity(1), 250);
        return () => clearTimeout(timer);
    }, [chosenCharacter]);

    useEffect(() => {
        setIsLoading(true);
        // console.log(verbose)
        if (verbose && verbose["Response"]) {
            if (verbose["Response"]["characterEquipment"]["data"][chosenCharacter] && verbose["Response"]["characterEquipment"]["data"][chosenCharacter]["items"]) {
                updateItemHashes(verbose["Response"]["characterEquipment"]["data"][chosenCharacter]["items"]);
                // setInventory(verbose["Response"]);
                setIsLoading(false);
            }
        }

    }, [verbose, chosenCharacter, characters]);

    useEffect(() => {
        const fetchItems = async () => {
            if (itemHashes.length > 0) {
                const promises = itemHashes.map(itemHash => GetItem(itemHash["itemHash"]));
                const fetchedItems = await Promise.all(promises);
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
                            <div>
                                <Image
                                    src={`https://bungie.net${items[i]["displayProperties"]["icon"]}`}
                                    width={70}
                                    height={70}
                                    alt="Kinetic"
                                    className="gear-icon"
                                />
                            </div>
                            <div style={{ 
                                height: "14px",
                                fontSize: "7px",
                                fontWeight: "500",
                                backgroundColor: "grey",
                                color: "white", 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center" 
                            }}>{items[i]["displayProperties"]["name"]}</div>
                        </div>
                        <div style={{ 
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 60px)",
                            gridGap: '1px', 
                            marginLeft: '14px',
                        }}>
                            {Array(9).fill(0).map((_, j) => (
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