import { useState, useEffect, useContext } from 'react';
import SidebarContext from '../Providers/SidebarProvider';
import LoadoutContext, { LoadoutsContextProps } from '../Providers/LoadoutsProvider';
import ChosenCharacterContext from '../Providers/ChosenCharacterProvider';
import CharactersContext from '../Providers/CharactersProvider';

export const Navbar = () => {
    const { sidebarOpen } = useContext(SidebarContext);
    const { characters } = useContext(CharactersContext);
    const { chosenCharacter } = useContext(ChosenCharacterContext);

    const [ optionSelect, chooseOption ] = useState<any>("none");
    const [ options, setOptions ] = useState<any>([]);
    const [ showAccordian, setShowAccordian ] = useState<boolean>(false);

    const [ loadoutsOpen, setLoadoutsOpen ] = useState(false);

    useEffect(() => {
        const Default = () => {
            if (chosenCharacter && optionSelect == "none") {
                for (let i in characters) {
                    if (characters[i]["characterId"] != chosenCharacter) {

                        if (characters[i]["classType"] == 0) {
                            chooseOption("Titan");

                            return "Titan";

                        } else if (characters[i]["classType"] == 1) {
                            chooseOption("Hunter");

                            return "Hunter";

                        } else {
                            chooseOption("Warlock");

                            return "Warlock";
                        }
                    }
                }
            }
        }

        if (optionSelect == "none") {
            let ignore = Default();

            let arr = [];

            for (let i in characters) {
                if (characters[i]["classType"] == 0) {
                    if (ignore != "Titan") {
                        arr.push("Titan");
                    }
                } else if (characters[i]["classType"] == 1) {
                    if (ignore != "Hunter") {
                        arr.push("Hunter");
                    }
                } else {
                    if (ignore != "Warlock") {
                        console.log(optionSelect);
                        arr.push("Warlock");
                    }
                }
            }

            setOptions(arr);
        }

    }, [chosenCharacter])

    const handleAccordianClick = () => {
        setShowAccordian(!showAccordian);
    }

    return (
        <div className={`top-0 z-20 navbar`}>
            <div className={`transition-all duration-1000 ${sidebarOpen ? "pushed": ""}`} style={{ 
            color: "white",
            fontSize: "17px",
            marginLeft: "10px",
            marginTop: "13px"
        }}>
                <div style={{ fontWeight: "700" }}>Lime Companion</div>

                {chosenCharacter === "" ? "" : 
                    <div style={{ width: "20px", fontWeight: "700", marginLeft: "10px", marginTop: "0px", fontSize: "17px", color: "#406da8" }}>
                        {characters[chosenCharacter]["classType"] === 0 && "Titan"}
                        {characters[chosenCharacter]["classType"] === 1 && "Hunter"}
                        {characters[chosenCharacter]["classType"] === 2 && "Warlock"}
                    </div>
                }

                <div className="ml-44">
                    {optionSelect == "none" ? <div>
                        
                    </div> : 
                    <div className="text-center" onClick={handleAccordianClick} style={{
                        width: "140px"
                    }}>
                        {optionSelect}
                        {showAccordian === true && 

                        <div className="pt-2 accordian" style={{ 
                            height: "95px",
                            width: "140px",
                            backgroundColor: "rgb(33, 32, 30)"
                        }}>
                            <p className="mt-2 text-center">{options[0]}</p>
                            <p className="mt-4 text-center">{options[1]}</p>
                        </div>}
                    </div>
                    }
                </div>                
            </div>
        </div>
    )
}

export default Navbar;