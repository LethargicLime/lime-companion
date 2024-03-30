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

    const [ kinetic, updateKinetic ] = useState([]);
    const [ energy, updateEnergy ] = useState([]);
    const [ power, updatePower ] = useState([]);

    useEffect(() => {
        let tempKinetic = []
        let tempEnergy = []

        console.log(vault);

        for (let i in vault) {
            // console.log(vault[i]);
            if (vault[i]["equippingBlock"]["equipmentSlotTypeHash"] === 1498876634) { 
                tempKinetic.push(vault[i]);   
            }
            if (vault[i]["equippingBlock"]["equipmentSlotTypeHash"] === 2465295065) {
                tempEnergy.push(vault[i]);
            }
        }

        updateKinetic(tempKinetic);
        updateEnergy(tempEnergy);
    }, [vault]);

    return (
        <div className="flex" style={{ paddingTop: "10px" }}>
            {thirdOption === "Vault" &&
                <div>
                    <div className="h-[200px]">
                        <div className="pl-[45px] h-[175px]" style={{ 
                            display: "grid",
                            gridTemplateColumns: "repeat(15, 50px)",
                            gridGap: "5px",
                            marginLeft: "14px",
                        }} onDragOver={(event) => handleItemDragOver(event)} onDrop={(event) => ReceiveItem(event, -1, "Vault")}>
                            {Array(kinetic.length).fill(0).map((_, i) => (
                                <div key={i}>
                                    <div style={{
                                        position: "relative",
                                        display: "inline-block"
                                    }}>
                                        <ItemDisplay itemInfo={kinetic[i]} iconSize={50} craftIconSize={12} characterId={-1} slot={"Vault"}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="pt-[30px] h-[200px]">
                        <div className="pl-[45px] h-[175px]" style={{ 
                            display: "grid",
                            gridTemplateColumns: "repeat(15, 50px)",
                            gridGap: "5px",
                            marginLeft: "14px",
                        }} onDragOver={(event) => handleItemDragOver(event)} onDrop={(event) => ReceiveItem(event, -1, "Vault")}>
                            {Array(energy.length).fill(0).map((_, i) => (
                                <div key={i}>
                                    <div style={{
                                        position: "relative",
                                        display: "inline-block"
                                    }}>
                                        <ItemDisplay itemInfo={energy[i]} iconSize={50} craftIconSize={12} characterId={-1} slot={"Vault"}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Vault;