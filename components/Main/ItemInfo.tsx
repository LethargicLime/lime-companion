import { useContext, useState, useEffect } from "react"
import ChosenCharacterContext from "../Providers/ChosenCharacterProvider"
import SelectedContext from "../Providers/SelectedProvider";

export const ItemInfo = () => {
    const { thirdOption } = useContext(ChosenCharacterContext);
    const { item } = useContext(SelectedContext);
    
    useEffect(() => {
        
    }, [thirdOption]);

    return (
        <div className="" style={{ paddingTop: "20px" }}>
            {thirdOption === "Verbose Item Info" && item && item["displayProperties"] &&
                <div className="text-white font-semibold text-lg" style={{
                    
                }}>
                    {item["displayProperties"]["name"]}
                </div>
            }
        </div>
    )
}