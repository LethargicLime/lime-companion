import { useContext, useState, useEffect } from "react"
import ChosenCharacterContext from "../../Providers/ChosenCharacterProvider"
import SelectedContext from "../../Providers/SelectedProvider";

export const ItemInfo = () => {
    const { thirdOption } = useContext(ChosenCharacterContext);
    const { item } = useContext(SelectedContext);

    const [ recoil, setRecoil ] = useState<any>(0);
    const [ direction, setDirection ] = useState<any>(0);
    const [ linePoints, setLinePoints ] = useState<any>([0, 0]);
    const [ points, setPoints ] = useState<any>([0, 0, 0, 0]);

    useEffect(() => {
        if (item && item["stats"] && item["stats"]["stats"]["2715839340"]) {
            let t: any = Math.sin((item["stats"]["stats"]["2715839340"]["value"] + 5) * Math.PI / 10)
            setRecoil(t.toFixed(4) * (100 - item["stats"]["stats"]["2715839340"]["value"]));

            setDirection(recoil * (Math.PI / 180));
            setLinePoints([Math.sin(direction), Math.cos(direction)]);

            let spread: any = ((100 - item["stats"]["stats"]["2715839340"]["value"]) / 100) * (180 / 2) * (Math.PI / 180) * Math.sign(direction);

            setPoints([Math.sin(direction + spread), Math.cos(direction + spread), Math.sin(direction - spread), Math.cos(direction - spread)]);
        }
    }, []);

    const graphicForRarity = (hash: string) => {
        const hashMap = {
            "2673424576": "rgb(206, 174, 51)",
            "3520001075": "rgb(82, 47, 101)"
        }

        return hashMap[hash] || ""
    }

    useEffect(() => {
            
    }, [thirdOption]);

    return (
        <div className="flex" style={{ paddingTop: "20px" }}>
            {thirdOption === "Verbose Item Info" && item && item["displayProperties"] &&
                <div className="ml-[151px] font-bold text-white font-semibold text-lg" style={{
                    width: "440px"
                }}>
                    <div className={`flex flex-row`} style={{ }}>
                        <div className="w-[200px]">
                            <p>{item["displayProperties"]["name"]}</p>
                            <p className="font-light text-[17px]">{item["itemTypeDisplayName"]}</p>
                        </div>
                        <div className="ml-[120px]">
                            <svg className="opacity-75" width="150px" height="50px">
                                <polygon points="10,50 60,0 150,0 150,50" fill={`${graphicForRarity(item["summaryItemHash"])}`} />
                            </svg>
                        </div>
                    </div>
                    <div className="w-[500px] flex flex-col font-normal text-[15px]">
                        <p className="w-[440px] pt-1 pb-1 font-light italic">{item["flavorText"]}</p>
                        
                        {item["stats"]["stats"]["4043523819"] && !item["stats"]["stats"]["2837207746"] && // has impact and is not a sword (so most weapons)
                        <div>
                            {item["stats"]["stats"]["2961396640"] && // bows and (linear) fusion rifles
                            <p className="">Charge Time<span className="ml-1 font-light">{item["stats"]["stats"]["2961396640"]["value"]}</span></p>}

                            {item["stats"]["stats"]["4284893193"] && // like everything else
                            <p className="">RPM<span className="ml-1 font-light">{item["stats"]["stats"]["4284893193"]["value"]}</span></p>}

                            <div className="flex flex-row">
                                <span className="w-[100px]">Impact</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["4043523819"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["4043523819"]["value"] * 3) }}>{item["stats"]["stats"]["4043523819"]["value"]}</span>
                            </div>
                            <div className="flex flex-row">
                                <span className="w-[100px]">Stability</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["155624089"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["155624089"]["value"] * 3) }}>{item["stats"]["stats"]["155624089"]["value"]}</span>
                            </div>
                            <div className="flex flex-row">
                                <span className="w-[100px]">Handling</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["155624089"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["155624089"]["value"] * 3) }}>{item["stats"]["stats"]["155624089"]["value"]}</span>
                            </div>
                            <div className="flex flex-row">
                                <span className="w-[100px]">Reload Speed</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["4188031367"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["4188031367"]["value"] * 3) }}>{item["stats"]["stats"]["4188031367"]["value"]}</span>
                            </div>
                            {item["stats"]["stats"]["1240592695"] && // bows dont have range, but otherwise have most of the other stats of a typical weapons
                            <div className="flex flex-row"> 
                                <span className="w-[100px]">Range</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["1240592695"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["1240592695"]["value"] * 3) }}>{item["stats"]["stats"]["1240592695"]["value"]}</span>
                            </div>}
                            {item["stats"]["stats"]["1591432999"] && // for bows 
                            <div className="flex flex-row"> 
                                <span className="w-[100px]">Accuracy</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["1591432999"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["1591432999"]["value"] * 3) }}>{item["stats"]["stats"]["1591432999"]["value"]}</span>
                            </div>}
                        </div>}

                        {item["stats"]["stats"]["3614673599"] && // has blast radius (so rocket/grenade launcher)
                        <div>
                            <p className="">RPM <span className="ml-1 font-light">{item["stats"]["stats"]["4284893193"]["value"]}</span></p>
                            <div className="flex flex-row">
                                <span className="w-[100px]">Blast Radius</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["3614673599"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["3614673599"]["value"] * 3) }}>{item["stats"]["stats"]["3614673599"]["value"]}</span>
                            </div>
                            <div className="flex flex-row">
                                <span className="w-[100px]">Stability</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["155624089"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["155624089"]["value"] * 3) }}>{item["stats"]["stats"]["155624089"]["value"]}</span>
                            </div>
                            <div className="flex flex-row">
                                <span className="w-[100px]">Handling</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["943549884"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["943549884"]["value"] * 3) }}>{item["stats"]["stats"]["943549884"]["value"]}</span>
                            </div>
                            <div className="flex flex-row">
                                <span className="w-[100px]">Reload Speed</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["4188031367"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["4188031367"]["value"] * 3) }}>{item["stats"]["stats"]["4188031367"]["value"]}</span>
                            </div>
                            <div className="flex flex-row">
                                <span className="w-[100px]">Velocity</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["2523465841"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["2523465841"]["value"] * 3) }}>{item["stats"]["stats"]["2523465841"]["value"]}</span>
                            </div>
                        </div>}

                        {item["stats"]["stats"]["2837207746"] && 
                        <div>
                            <div className="flex flex-row">
                                <span className="w-[100px]">Impact</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["4043523819"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["4043523819"]["value"] * 3) }}>{item["stats"]["stats"]["4043523819"]["value"]}</span>
                            </div>
                            <div className="flex flex-row">
                                <span className="w-[100px]">Swing Speed</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["2837207746"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["2837207746"]["value"] * 3) }}>{item["stats"]["stats"]["2837207746"]["value"]}</span>
                            </div>
                            <div className="flex flex-row">
                                <span className="w-[100px]">Guard Resist</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["209426660"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["209426660"]["value"] * 3) }}>{item["stats"]["stats"]["209426660"]["value"]}</span>
                            </div>
                            <p className="">Magazine<span className="ml-2 font-light">{item["stats"]["stats"]["3871231066"]["value"]}</span></p>
                        </div>
                        }

                        {!item["stats"]["stats"]["2837207746"] && // is not a sword
                        <div>
                            <div className="flex flex-row">
                                <span className="w-[100px]">Aim Assist</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["1345609583"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["1345609583"]["value"] * 3) }}>{item["stats"]["stats"]["1345609583"]["value"]}</span>
                            </div>
                            <div className="flex flex-row">
                                <span className="w-[100px]">Airborn</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["2714457168"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["2714457168"]["value"] * 3) }}>{item["stats"]["stats"]["2714457168"]["value"]}</span>
                            </div>
                            <div className="flex flex-row">
                                <span className="w-[100px]">Zoom</span>
                                <div className={`ml-[10px] mt-[7px] stat-bar`} style={{ width: item["stats"]["stats"]["3555269338"]["value"] * 3 }}></div>
                                <span style={{ marginLeft: 310 - (item["stats"]["stats"]["3555269338"]["value"] * 3) }}>{item["stats"]["stats"]["3555269338"]["value"]}</span>
                            </div>
                            {item["stats"]["stats"]["3871231066"] && // bows don't have a magazine
                            <p className="">Magazine<span className="ml-2 font-light">{item["stats"]["stats"]["3871231066"]["value"]}</span></p>}

                            <div className="flex flex-row items-center">
                                <p className="w-[200px]">Recoil Direction<span className="ml-2 mr-2 font-light">{item["stats"]["stats"]["2715839340"]["value"]}</span></p>
                                <svg className="pl-2" height="12" viewBox="0 0 2 1" style={{ display: "block" }}>
                                    {
                                        item["stats"]["stats"]["2715839340"]["value"] === 95 ? 
                                        <line x1={1 - linePoints[0]} y1={1 + linePoints[1]} x2={1 + linePoints[0]} y2={1 - linePoints[1]} /> :
                                        <path d={`M1, 1 L${1 + points[0]},${1 - points[1]} A1,1 0 0, ${direction < 0 ? "1" : "0"} ${1 + points[2]}, ${1 - points[3]}`} 
                                        fill="white"/>
                                    }
                                </svg>
                            </div>
                        </div>
                        }
                    </div>  
                </div>
            }
        </div>
    )
}