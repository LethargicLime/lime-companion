import { useContext, useState, useEffect } from "react"
import ChosenCharacterContext from "../../Providers/ChosenCharacterProvider"
import VerboseContext from "@/components/Providers/VerboseCharactersProvider";

export const Vault = () => {
    const { thirdOption } = useContext(ChosenCharacterContext);
    const { vault, updateVault } = useContext(VerboseContext);

    const [ primaries, updatePrimary ] = useState([]);

    useEffect(() => {
        let tempPrimary = []

        for (let i in vault) {
            console.log(vault[i]);
            if (vault[i]["bucketHash"] === 1498876634) { 
                console.log("test")   
            }
        }

        updatePrimary(tempPrimary);
        console.log(tempPrimary);
    }, [vault]);

    return (
        <div className="flex" style={{ paddingTop: "20px" }}>
            {thirdOption === "Vault" &&
                <div className="ml-[151px]">
                    {Array(Vault.length).fill(0).map((_, i) => (
                        <div key={i}>
                            Testing
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Vault;