import { useContext, useState, useEffect } from "react"
import ChosenCharacterContext from "../../Providers/ChosenCharacterProvider"

export const Vault = () => {
    const { thirdOption } = useContext(ChosenCharacterContext);

    return (
        <div className="flex" style={{ paddingTop: "20px" }}>
            {thirdOption === "Vault" &&
                <div className="ml-[151px]">
                    
                </div>
            }
        </div>
    )
}

export default Vault;