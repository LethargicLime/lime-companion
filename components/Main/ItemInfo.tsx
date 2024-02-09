import { useContext, useState, useEffect } from "react"
import ChosenCharacterContext from "../Providers/ChosenCharacterProvider"
import SelectedContext from "../Providers/SelectedProvider";

export const ItemInfo = () => {
    const { thirdOption } = useContext(ChosenCharacterContext);
    const { item } = useContext(SelectedContext);
    

    const graphicForRarity = (hash:string) => {
        const hashMap = {
            "2673424576": "exotic",
            "3520001075": "legendary"
        }

        return hashMap[hash] || ""
    }

    useEffect(() => {
        
    }, [thirdOption]);

    return (
        <div className="flex" style={{ paddingTop: "20px" }}>
            {thirdOption === "Verbose Item Info" && item && item["displayProperties"] &&
                <div className="ml-[151px] font-bold text-white font-semibold text-lg" style={{
                    width: "300px"
                }}>
                    <div className={`${graphicForRarity(item["summaryItemHash"])}`}>
                        <p>{item["displayProperties"]["name"]}</p>
                        <p className="font-light text-[17px]">{item["itemTypeDisplayName"]}</p>
                    </div>
                </div>
            }
        </div>
    )
}