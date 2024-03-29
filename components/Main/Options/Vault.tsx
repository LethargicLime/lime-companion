import { useContext, useState, useEffect } from "react"
import ChosenCharacterContext from "../../Providers/ChosenCharacterProvider"
import VerboseContext from "@/components/Providers/VerboseCharactersProvider";

import Image from 'next/image';
import CraftedIcon from "@/public/PatternIcon.jpg";
import ItemDisplay from "../ItemDisplay";
import { ReceiveItem, handleItemDragOver } from "../ItemTransfer";

export const Vault = () => {
    const { thirdOption } = useContext(ChosenCharacterContext);
    const { vault, updateVault } = useContext(VerboseContext);

    const [ primaries, updatePrimary ] = useState([]);

    useEffect(() => {
        let tempPrimary = []

        console.log(vault);

        for (let i in vault) {
            // console.log(vault[i]);
            if (vault[i]["equippingBlock"]["equipmentSlotTypeHash"] === 1498876634) { 
                tempPrimary.push(vault[i]);   
            }
        }

        updatePrimary(tempPrimary);
        console.log(tempPrimary);
    }, [vault]);

    return (
        <div className="flex" style={{ paddingTop: "20px" }}>
            {thirdOption === "Vault" &&
                <div className="pl-[50px] h-[232px]" style={{ 
                    display: "grid",
                    gridTemplateColumns: "repeat(15, 50px)",
                    gridGap: "5px", 
                    marginLeft: "14px",
                }} onDragOver={(event) => handleItemDragOver(event)} onDrop={(event) => ReceiveItem(event, -1, "Vault")}>
                    {Array(primaries.length).fill(0).map((_, i) => (
                        <div key={i}>
                            <div style={{
                                position: "relative"
                            }}>
                                <ItemDisplay itemInfo={primaries[i]} iconSize={50} craftIconSize={12} characterId={-1} slot={"Vault"}/>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Vault;