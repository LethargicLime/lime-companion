import Image from 'next/image';
import CraftedIcon from "@/public/PatternIcon.jpg";

function sendInformation(event, itemInfo) {
    event.dataTransfer.setData("item", JSON.stringify(itemInfo));
}

export const ItemDisplay = ({itemInfo, iconSize, craftIconSize}) => {
    return (
        <>
        <div draggable="true" onDragStart={(event) => sendInformation(event, itemInfo)}>
            <div className={itemInfo["state"] == 4 
            || itemInfo["socketInfo"][0]["itemTypeDisplayName"] == "Enhanced Intrinsic" ? "masterwork-icon" : "gear-icon"} style={{
                position: "relative",
            }}>
                <Image 
                    src={`https://bungie.net${itemInfo["iconWatermark"]}`}
                    width={iconSize}
                    height={iconSize}
                    className="watermark"
                    alt="Watermark"
                    style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none"}}
                />
                {itemInfo["overrideStyle"] ? 
                <Image
                    src={`https://bungie.net${itemInfo["overrideStyle"]["displayProperties"]["icon"]}`}
                    width={iconSize}
                    height={iconSize}
                    alt="Primary"
                    style={{pointerEvents: "none"}}
                /> : 
                <Image
                    src={`https://bungie.net${itemInfo["displayProperties"]["icon"]}`}
                    width={iconSize}
                    height={iconSize}
                    alt="Primary"
                    style={{pointerEvents: "none"}}
                />}
                {itemInfo["state"] == 8 || itemInfo["state"] == 9 ? 
                <div className="" style={{
                    marginTop: "-17px", 
                    marginLeft: "3px",
                    position: "absolute",
                }}>
                    <Image 
                        src={CraftedIcon}
                        width={craftIconSize}
                        height={craftIconSize}
                        alt="Crafted Icon"
                        style={{pointerEvents: "none"}}
                    />
                </div> : ""}
            </div>
            <div className="" style={{
                height: "14px",
                fontSize: "10px",
                fontWeight: "700",
                backgroundColor: "#3d3d3d",
                color: "white", 
                display: "flex", 
                alignItems: "center",
                opacity: "",
                justifyContent: "center",
            }}>
                <Image 
                    src={`https://bungie.net${itemInfo["damageInformation"]["displayProperties"]["icon"]}`}
                    width={11}
                    height={11}
                    alt="Damage Type"
                    style={{pointerEvents: "none"}}
                />
                <span className="pl-1">{itemInfo["primaryStat"]["value"]}</span>
        </div>
        </div>
        </>
        );
}

export default ItemDisplay;