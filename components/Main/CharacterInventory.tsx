import CharactersContext from '../Providers/CharactersProvider'
import ChosenCharacterContext from '../Providers/ChosenCharacterProvider';
import { GetItem } from '../Destiny/Fetch';
import VerboseContext from '../Providers/VerboseCharactersProvider';


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
        console.log(verbose)
        if (verbose && verbose["Response"]) {
            if (verbose["Response"]["characterEquipment"]["data"][chosenCharacter] && verbose["Response"]["characterEquipment"]["data"][chosenCharacter]["items"]) {
                updateItemHashes(verbose["Response"]["characterEquipment"]["data"][chosenCharacter]["items"]);
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
                <div style={{ display: "flex" }}>
                    <div>
                        <img className="gear-icon" src={`https://bungie.net${items[0]["displayProperties"]["icon"]}`}>
                        </img>
                    </div>
                    <div style={{ 
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 60px)",
                        gridGap: '2px', 
                        marginLeft: '14px',
                    }}>
                        {Array(9).fill(0).map((_, i) => (
                            <img key={i} className="gear-icon" src={`https://bungie.net${items[0]["displayProperties"]["icon"]}`}>
                            </img>
                        ))}
                    </div>
                </div>
                <img className="gear-icon" src={`https://bungie.net${items[1]["displayProperties"]["icon"]}`}>
                </img>
                <img className="gear-icon" src={`https://bungie.net${items[2]["displayProperties"]["icon"]}`}>
                </img>
                <img className="gear-icon" src={`https://bungie.net${items[3]["displayProperties"]["icon"]}`}>
                </img>
                <img className="gear-icon" src={`https://bungie.net${items[4]["displayProperties"]["icon"]}`}>
                </img>
                <img className="gear-icon" src={`https://bungie.net${items[5]["displayProperties"]["icon"]}`}>
                </img>
                <img className="gear-icon" src={`https://bungie.net${items[6]["displayProperties"]["icon"]}`}>
                </img>
                <img className="gear-icon" src={`https://bungie.net${items[7]["displayProperties"]["icon"]}`}>
                </img>
            </div>
            : ""}
            
        </div>
    )
}