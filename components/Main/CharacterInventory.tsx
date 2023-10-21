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

    const [isLoading, setIsLoading] = useState(true);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        setOpacity(.25);
        const timer = setTimeout(() => setOpacity(1), 250);
        return () => clearTimeout(timer);
    }, [chosenCharacter]);

    useEffect(() => {
        setIsLoading(true);
        if (verbose[chosenCharacter] && verbose[chosenCharacter]["items"]) {
            updateItemHashes(verbose[chosenCharacter]["items"]);
            setIsLoading(false);
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
            Select a character :)
        </div>;
    }
    
    return (
        <div className="" style={{ 
            paddingLeft: "45px",
            paddingTop: "30px",
            fontWeight: "700",
            opacity: opacity,
            transition: 'opacity 0.25s ease-out'
        }}>
            {items.length > 0 ? 
            <div>
                <div>
                    Kinetic: {items[0]["displayProperties"]["name"]}
                </div>
                <img className="gear-icon" src={`https://bungie.net${items[0]["displayProperties"]["icon"]}`}>
                </img>
                <div>
                    Energy: {items[1]["displayProperties"]["name"]}
                </div>
                <img className="gear-icon" src={`https://bungie.net${items[1]["displayProperties"]["icon"]}`}>
                </img>
                <div>
                    Heavy: {items[2]["displayProperties"]["name"]}
                </div>
                <img className="gear-icon" src={`https://bungie.net${items[2]["displayProperties"]["icon"]}`}>
                </img>
            </div>
            : ""}
            
        </div>
    )
}