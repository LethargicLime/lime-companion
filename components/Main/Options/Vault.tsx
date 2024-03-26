import { useContext, useState, useEffect } from "react"
import ChosenCharacterContext from "../../Providers/ChosenCharacterProvider"
import VerboseContext from "@/components/Providers/VerboseCharactersProvider";

import Image from 'next/image';
import CraftedIcon from "@/public/PatternIcon.jpg";

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
                }}>
                    {Array(primaries.length).fill(0).map((_, i) => (
                        <div key={i}>
                            <div className={primaries[i]["state"] == 4 
                            || primaries[i]["socketInfo"][0]["itemTypeDisplayName"] == "Enhanced Intrinsic" ? "masterwork-icon" : "gear-icon"} style={{
                                position: "relative"
                            }}>
                                <Image 
                                    src={`https://bungie.net${primaries[i]["iconWatermark"]}`}
                                    width={50}
                                    height={50}
                                    className="watermark"
                                    alt="Watermark"
                                    style={{ position: "absolute", top: 0, left: 0 }}
                                />
                                {primaries[i]["overrideStyle"] ? 
                                <Image
                                    src={`https://bungie.net${primaries[i]["overrideStyle"]["displayProperties"]["icon"]}`}
                                    width={50}
                                    height={50}
                                    alt="Primary"
                                /> : 
                                <Image
                                    src={`https://bungie.net${primaries[i]["displayProperties"]["icon"]}`}
                                    width={50}
                                    height={50}
                                    alt="Primary"
                                />}
                                {primaries[i]["state"] == 8 || primaries[i]["state"] == 9 ? 
                                <div className="" style={{
                                    marginTop: "-17px", 
                                    marginLeft: "3px",
                                    position: "absolute",
                                }}>
                                    <Image 
                                        src={CraftedIcon}
                                        width={13}
                                        height={13}
                                        alt="Crafted Icon"
                                    />
                                </div> : ""}
                            </div>
                            <div className="" style={{
                                height: "14px",
                                fontSize: "10px",
                                fontWeight: "500",
                                backgroundColor: "#3d3d3d",
                                color: "white", 
                                display: "flex", 
                                alignItems: "center",
                                opacity: "",
                                justifyContent: "center",
                            }}>
                                <Image 
                                    src={`https://bungie.net${primaries[i]["damageInformation"]["displayProperties"]["icon"]}`}
                                    width={11}
                                    height={11}
                                    alt="Damage Type"
                                />
                                <span className="pl-1">{primaries[i]["primaryStat"]["value"]}</span>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Vault;