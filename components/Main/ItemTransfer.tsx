import { EquipItem, TransferItem, VaultTransfer } from "../Destiny/Fetch";

export function SendItem(event, itemInfo, characterId, slot) {
    event.dataTransfer.setData("item", JSON.stringify(itemInfo));
    event.dataTransfer.setData("characterId", characterId);
    event.dataTransfer.setData("slot", slot);
}

export function ReceiveItem(event, characterId, slot){
    event.preventDefault();
    var item = JSON.parse(event.dataTransfer.getData("item"));
    var fromCharacterId = event.dataTransfer.getData("characterId");
    var fromSlot = event.dataTransfer.getData("slot");
    console.log(item);
    console.log("Move from " + fromCharacterId + " " + fromSlot + " into " + characterId + " " + slot);
    if(slot === "Loadout"){
        EquipItem(characterId, item);
    }else{
        TransferItem(characterId, item, slot === "Vault")
    }
}

export function handleItemDragOver(event){
    event.preventDefault();
}