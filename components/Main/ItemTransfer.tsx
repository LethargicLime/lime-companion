import { useContext } from "react";
import { EquipItem, TransferItem, VaultTransfer } from "../Destiny/Fetch";
import VerboseContext from "../Providers/VerboseCharactersProvider";

export const ReceiveItem = (event, characterId, slot) => {
    event.preventDefault();
    var item = JSON.parse(event.dataTransfer.getData("item"));
    var fromCharacterId = event.dataTransfer.getData("characterId");
    var fromSlot = event.dataTransfer.getData("slot");
    
    // console.log(item);
    console.log("Move from " + fromCharacterId + " " + fromSlot + " into " + characterId + " " + slot);

    if (slot === "Loadout") {

        EquipItem(characterId, item);
    } else {
        TransferItem(characterId, item, slot === "Vault");
    }

    return [characterId, item];
}