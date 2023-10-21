import { useState, useContext } from 'react';
import SidebarContext from '../Providers/SidebarProvider';
import LoadoutContext, { LoadoutsContextProps } from '../Providers/LoadoutsProvider';
import ChosenCharacterContext from '../Providers/ChosenCharacterProvider';
import CharactersContext from '../Providers/CharactersProvider';

export const Navbar = () => {
    const { sidebarOpen } = useContext(SidebarContext);
    const { characters } = useContext(CharactersContext);
    const { chosenCharacter } = useContext(ChosenCharacterContext);
    // const { loadouts } = useContext(LoadoutContext);

    const [loadoutsOpen, setLoadoutsOpen] = useState(false);

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
                    <div style={{ fontWeight: "700", marginLeft: "10px", marginTop: "0px", fontSize: "17px", color: "#406da8" }}>
                        {characters[chosenCharacter]["classType"] === 1 && "Hunter"}
                        {characters[chosenCharacter]["classType"] === 0 && "Titan"}
                        {characters[chosenCharacter]["classType"] === 2 && "Warlock"}
                    </div>
                }

                {/* <div onClick={() => setLoadoutsOpen(!loadoutsOpen)}
                style={{ 
                    marginLeft: "10px",
                }}>
                    Loadouts
                </div> */}
                
            </div>
        </div>
    )
}

export default Navbar;