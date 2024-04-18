import { useContext, useState, useEffect } from "react"
import ChosenCharacterContext from "../../Providers/ChosenCharacterProvider"
import VerboseContext from "@/components/Providers/VerboseCharactersProvider";

import Image from 'next/image';
import CraftedIcon from "@/public/PatternIcon.jpg";
import ItemDisplay from "../ItemDisplay";
import { ReceiveItem, handleItemDragOver } from "../ItemTransfer";
import { ItemLocation, ItemBucketHash } from "../ItemEnumDefinition";

export const Vault = () => {
    const { thirdOption } = useContext(ChosenCharacterContext);
    const { equipped, inventory, vault, divHeight, updateInventory, updateVault } = useContext(VerboseContext);

    const [ kinetic, updateKinetic ] = useState([]);
    const [ energy, updateEnergy ] = useState([]);
    const [ power, updatePower ] = useState([]);

    const handleIconClick = (info: any) => {
        console.log(info);

        console.log(divHeight);
    }

    useEffect(() => {
        let tempKinetic = []
        let tempEnergy = []

        // console.log(vault);

        for (let i in vault) {
            if (vault[i]["equippingBlock"]) {
                // console.log(vault[i]);
                if (vault[i]["equippingBlock"]["equipmentSlotTypeHash"] === ItemBucketHash.KINETIC) { 
                    tempKinetic.push(vault[i]);   
                }
                if (vault[i]["equippingBlock"]["equipmentSlotTypeHash"] === ItemBucketHash.ENERGY) {
                    tempEnergy.push(vault[i]);
                }
            }
        }

        updateKinetic(tempKinetic);
        updateEnergy(tempEnergy);
    }, [vault]);

    const _ReceiveItem = async (event, characterId, slot) => {
        let t = await ReceiveItem(event, characterId, slot, {equipped, inventory, vault});

        const tempInventory = inventory.filter(item => item["hash"] !== t[0]["hash"]);

        t[0]["bucketHash"] = 138197802;

        const tempVault = [...vault, {...t[0], "character": t[1]}];

        updateVault(tempVault);
        updateInventory(tempInventory);
    }

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
                        }} onDragOver={(event) => handleItemDragOver(event)} onDrop={(event) => _ReceiveItem(event, -1, ItemLocation.VAULT)}>
                            {Array(kinetic.length).fill(0).map((_, i) => (
                                <div key={i}>
                                    <div style={{
                                        position: "relative",
                                        display: "inline-block"
                                    }} onClick={() => handleIconClick(kinetic[i])}>
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
                        }} onDragOver={(event) => handleItemDragOver(event)} onDrop={(event) => _ReceiveItem(event, -1, ItemLocation.VAULT)}>
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