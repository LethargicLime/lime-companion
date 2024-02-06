import { useState, useEffect, useContext } from 'react';
import SidebarContext from '../Providers/SidebarProvider';
import LoadoutContext, { LoadoutsContextProps } from '../Providers/LoadoutsProvider';
import ChosenCharacterContext from '../Providers/ChosenCharacterProvider';
import CharactersContext from '../Providers/CharactersProvider';

export const Navbar = () => {
    const { sidebarOpen } = useContext(SidebarContext);
    const { characters } = useContext(CharactersContext);
    const { chosenCharacter, secondaryCharacter, setSecondaryCharacter } = useContext(ChosenCharacterContext);

    const [ firstOption, setFirstOption ] = useState<string>("none");
    const [ secondOption, setSecondOption ] = useState<string>("");
    const [ showAccordian, setShowAccordian ] = useState<boolean>(false);

    const [ loadoutsOpen, setLoadoutsOpen ] = useState(false);

    useEffect(() => {
        const Default = () => {
            if (chosenCharacter && firstOption == "none") {
                for (let i in characters) {
                    if (characters[i]["characterId"] != chosenCharacter) {

                        if (characters[i]["classType"] == 0) {
                            setFirstOption("Titan");

                            return "Titan";

                        } else if (characters[i]["classType"] == 1) {
                            setFirstOption("Hunter");

                            return "Hunter";

                        } else {
                            setFirstOption("Warlock");

                            return "Warlock";
                        }
                    }
                }
            }
        }

        if (firstOption == "none" && chosenCharacter) {
            let ignore = Default();

            console.log(chosenCharacter)

            for (let i in characters) {
                if (characters[i]["classType"] == 0) {
                    if (ignore != "Titan" && characters[chosenCharacter]["classType"] != 0) {
                        setSecondOption("Titan");
                    }
                } else if (characters[i]["classType"] == 1) {
                    if (ignore != "Hunter" && characters[chosenCharacter]["classType"] != 1) {
                        setSecondOption("Hunter");
                    }
                } else {
                    if (ignore != "Warlock" && characters[chosenCharacter]["classType"] != 2) {
                        setSecondOption("Warlock");
                    }
                }
            }
        } else if (chosenCharacter) {
            if (characters[chosenCharacter]["classType"] == 0) {
                setFirstOption("Hunter");
                setSecondOption("Warlock");
            }
            if (characters[chosenCharacter]["classType"] == 1) {
                setFirstOption("Titan");
                setSecondOption("Warlock");
            }
            if (characters[chosenCharacter]["classType"] == 2) {
                setFirstOption("Titan");
                setSecondOption("Hunter");
            }
        }

    }, [chosenCharacter]);

    useEffect(() => {
        for (let i in characters) {
            console.log()
            if (firstOption == "Warlock" && characters[i]["classType"] == 0) {
                setSecondaryCharacter(i);
            }
            if (firstOption == "Hunter" && characters[i]["classType"] == 1) {
                setSecondaryCharacter(i);
            }
            if (firstOption == "Warlock" && characters[i]["classType"] == 2) {
                setSecondaryCharacter(i);
            }
        }

    }, [firstOption])

    const handleAccordianClick = () => {
        setShowAccordian(!showAccordian);
    }

    const handleOptionClick = () => {
        console.log("test")

        let t = firstOption;
        setFirstOption(secondOption);
        setSecondOption(t);        
    }

    return (
        <div className={`top-0 relative z-20 navbar`}>
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

                <div className="z-1 ml-44">
                    {firstOption == "none" ? <div>
                        
                    </div> : 
                    <div className="z-10 fixed text-center" onClick={handleAccordianClick} style={{
                        width: "140px"
                    }}>
                        {firstOption}
                        {showAccordian === true && 

                        <div className="z-10 pt-2 accordian" style={{ 
                            height: "50px",
                            width: "140px",
                            backgroundColor: "rgb(33, 32, 30)"
                        }}>
                            <p className="z-1 mt-2 text-center" onClick={handleOptionClick}>{secondOption}</p>
                        </div>}
                    </div>
                    }
                </div>                
            </div>
        </div>
    )
}

export default Navbar;