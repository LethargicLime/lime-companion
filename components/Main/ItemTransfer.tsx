import { TransferItem, } from "../Destiny/Fetch";

export function SendItem(event, itemInfo, characterId, slot) {
    event.dataTransfer.setData("item", JSON.stringify(itemInfo));
    event.dataTransfer.setData("characterId", characterId);
    event.dataTransfer.setData("slot", slot);
}

export async function ReceiveItem(event, characterId, slot, allItems){
    event.preventDefault();
    var item = JSON.parse(event.dataTransfer.getData("item"));
    var fromCharacterId = event.dataTransfer.getData("characterId");
    var fromSlot = event.dataTransfer.getData("slot");

    console.log(item);
    console.log("Move from " + fromCharacterId + " " + fromSlot + " into " + characterId + " " + slot);

    console.log(TransferItem(characterId, item, slot, allItems));

    return [item, characterId];
}

export function handleItemDragOver(event){
    event.preventDefault();
}