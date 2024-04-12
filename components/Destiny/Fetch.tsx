import { ItemLocation } from "../Main/ItemTransfer";
import { RemoveParams } from "../Main/Link";
import { ChangeUser, GetBungieId, GetMembership, GetData, SetValid, StoreData, keyList, GetGlobalData, StoreGlobalData } from "../Main/Storage";

let base = {
    "url": "https://www.bungie.net/Platform",
    "key": process.env.NEXT_PUBLIC_API_KEY,
    "oAuth": "https://www.bungie.net/en/OAuth/Authorize",
    "token": "https://www.bungie.net/Platform/App/OAuth/token/"
}

var perfStart : { [id: string]: number} = {}
var perfEnd : { [id: string]: number} = {}

export async function logPerf() {
    for(let key in perfStart){
        // console.log(`${key}:${perfEnd[key] - perfStart[key]}`)
    }
}

export async function authorize() {
    const startTime = performance.now();

    const queryParams = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        response_type: 'code',
    })

    const href = await `https://www.bungie.net/en/OAuth/Authorize?${queryParams.toString()}`;

    location.href = href;
    
    const endTime = performance.now();
    perfStart[authorize.name] = perfStart[authorize.name] == null ? 
        startTime : Math.min(perfStart[authorize.name], startTime);
    perfEnd[authorize.name] = perfEnd[authorize.name] == null ? 
        endTime : Math.max(perfStart[authorize.name], endTime);
}

export async function GetToken() {
    const startTime = performance.now();
    const urlInfo = new URLSearchParams(location.search);
    const code = urlInfo.get("code");
    if(code != null){
        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_API_SECRET
        })
    
        const response = await fetch(base["token"], {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    
        if (response.ok) {
            const r = await response.json();
            ChangeUser(r["membership_id"]);
            StoreData(keyList.token, r["access_token"], r["expires_in"]);
            StoreData(keyList.refreshToken, r["refresh_token"], r["refresh_expires_in"]);
            RemoveParams("code");
        } else {
            console.log("Failure: " + response);
        }
    }else{
        if(GetData(keyList.token) != null){
            return;
        }else if(GetData(keyList.refreshToken) != null){
            const body = new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: GetData(keyList.refreshToken),
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_API_SECRET
            })
            const response = await fetch(base["token"], {
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            console.log(response);
            if(response.ok){
                const r = await response.json();
                StoreData(keyList.token, r["access_token"], r["expires_in"]);
                StoreData(keyList.refreshToken, r["refresh_token"], r["refresh_expires_in"]);
            }else{
                location.href = "../lime-companion/";
            }
        }else{
            location.href = "../lime-companion/";
        }
    }
    const endTime = performance.now();
    
    perfStart[GetToken.name] = perfStart[GetToken.name] == null ? 
        startTime : Math.min(perfStart[GetToken.name], startTime);
    perfEnd[GetToken.name] = perfEnd[GetToken.name] == null ? 
        endTime : Math.max(perfStart[GetToken.name], endTime);
}

export async function Fetch() {
    const startTime = performance.now();

    const options = {
        "method": "GET",
        "x-api-key": base["key"],
    }

    const manifest = await fetch(base["url"] + "/Destiny2/Manifest", options)
    const data = await manifest.json();

    console.log(data);

    const endTime = performance.now();
    perfStart[Fetch.name] = perfStart[Fetch.name] == null ? 
        startTime : Math.min(perfStart[Fetch.name], startTime);
    perfEnd[Fetch.name] = perfEnd[Fetch.name] == null ? 
        endTime : Math.max(perfStart[Fetch.name], endTime);
}

export async function GetCharacterInfo(id: string) {
    const startTime = performance.now();
    const options = {
        "method": "GET",
        "headers": {
            "x-api-key": base["key"],
            authorization: `Bearer ${GetData(keyList.token)}`
        },
    }

    const response = await fetch(base["url"] + `/Destiny2/${GetMembership()["membershipType"]}/Profile/${id}/?components=200`, options)
    const data = await response.json();

    // console.log(data);
    const endTime = performance.now();
    perfStart[GetCharacterInfo.name] = perfStart[GetCharacterInfo.name] == null ? 
        startTime : Math.min(perfStart[GetCharacterInfo.name], startTime);
    perfEnd[GetCharacterInfo.name] = perfEnd[GetCharacterInfo.name] == null ? 
        endTime : Math.max(perfStart[GetCharacterInfo.name], endTime);
    
    return data["Response"]["characters"]["data"];
}

export async function GetVerboseInformation(id: string) {
    const startTime = performance.now();

    const options = {
        "method": "GET",
        "headers": {
            "x-api-key": base["key"],
            authorization: `Bearer ${GetData(keyList.token)}`
        },
        
    }

    const response = await fetch(base["url"] + `/Destiny2/${GetMembership()["membershipType"]}/Profile/${id}/?components=205,201,102`, options);
    const data = await response.json();

    // console.log(data);
    const endTime = performance.now();
    perfStart[GetVerboseInformation.name] = perfStart[GetVerboseInformation.name] == null ? 
        startTime : Math.min(perfStart[GetVerboseInformation.name], startTime);
    perfEnd[GetVerboseInformation.name] = perfEnd[GetVerboseInformation.name] == null ? 
        endTime : Math.max(perfStart[GetVerboseInformation.name], endTime);
    return data;
}

export async function GetItem(id: string) {
    const startTime = performance.now();

    var data = GetGlobalData(keyList.item, id);
    if(data == null){
        const options = {
            method: "GET",
            headers: {
                "x-api-key": base["key"]
            },
        }
        const response = await fetch(base["url"] + `/Destiny2/Manifest/DestinyInventoryItemDefinition/${id}/`, options)
        const item = await response.json();
        data = item["Response"];
        StoreGlobalData(keyList.item, id, data);
    }

    const endTime = performance.now();
    perfStart[GetItem.name] = perfStart[GetItem.name] == null ? 
        startTime : Math.min(perfStart[GetItem.name], startTime);
    perfEnd[GetItem.name] = perfEnd[GetItem.name] == null ? 
        endTime : Math.max(perfStart[GetItem.name], endTime);
    return data;
}

export async function SpecificMemberId(id: string) {
    const startTime = performance.now();

    const response = await fetch(`${base["url"]}/User/GetMembershipsById/${id}/-1/`,{
        method: "GET",
        headers: {
            "x-api-key": base["key"]
        }
    });
    
    const data = await response.json();
    const output = []
    for(var membership in data["Response"]["destinyMemberships"]){
        output.push({membershipId: data["Response"]["destinyMemberships"][membership]["membershipId"], 
        membershipType: data["Response"]["destinyMemberships"][membership]["membershipType"]})
    }
    StoreData(keyList.memberships, output);
    // console.log(data);

    const endTime = performance.now();
    perfStart[SpecificMemberId.name] = perfStart[SpecificMemberId.name] == null ? 
        startTime : Math.min(perfStart[SpecificMemberId.name], startTime);
    perfEnd[SpecificMemberId.name] = perfEnd[SpecificMemberId.name] == null ? 
        endTime : Math.max(perfStart[SpecificMemberId.name], endTime);
}

export async function GetDamageType(hash: string) {
    const startTime = performance.now();

    var data = GetGlobalData(keyList.damageType, hash);
    if(data == null){
        const response = await fetch(base["url"] + `/Destiny2/Manifest/DestinyDamageTypeDefinition/${hash}/`, {
            method: "GET",
            headers: {
                "x-api-key": base["key"],
                authorization: `Bearer ${GetData(keyList.token)}`
            }
        });
        const r = await response.json();
        data = r["Response"];
        StoreGlobalData(keyList.damageType, hash, data);
    }
    
    const endTime = performance.now();
    perfStart[GetDamageType.name] = perfStart[GetDamageType.name] == null ? 
        startTime : Math.min(perfStart[GetDamageType.name], startTime);
    perfEnd[GetDamageType.name] = perfEnd[GetDamageType.name] == null ? 
        endTime : Math.max(perfStart[GetDamageType.name], endTime);
    return data;
}

export async function HasIntrinsicUpgrade(hash: string) {
    const startTime = performance.now();

    const response = await fetch(base["url"] + `${hash}`, {
        method: "GET",
        headers: {
            "x-api-key": base["key"],
            authorization: `Bearer ${GetData(keyList.token)}`
        }
    })

    const data = await response.json();

    console.log(data);

    const endTime = performance.now();
    perfStart[HasIntrinsicUpgrade.name] = perfStart[HasIntrinsicUpgrade.name] == null ? 
        startTime : Math.min(perfStart[HasIntrinsicUpgrade.name], startTime);
    perfEnd[HasIntrinsicUpgrade.name] = perfEnd[HasIntrinsicUpgrade.name] == null ? 
        endTime : Math.max(perfStart[HasIntrinsicUpgrade.name], endTime);
}

export async function ItemInstance(id: string, item: string) {
    const startTime = performance.now();

    const response = await fetch(base["url"] + `/Destiny2/${GetMembership()["membershipType"]}/Profile/${id}/Item/${item}/?components=300,305,307,309`, {
        method: "GET",
        headers: {
            "x-api-key": base["key"],
            authorization: `Bearer ${GetData(keyList.token)}`
        }
    });

    const data = await response.json();

    // console.log(data);

    for (let i in data["Response"]["item"]["data"]) {
        data["Response"]["instance"]["data"][i] = data["Response"]["item"]["data"][i]
    }

    if (data["Response"]["instance"]["data"]["damageType"] && data["Response"]["instance"]["data"]["damageType"] !== 0) {
        data["Response"]["instance"]["data"]["damageInformation"] = await GetDamageType(data["Response"]["instance"]["data"]["damageTypeHash"]);
    }

    if (data["Response"]["sockets"] && data["Response"]["sockets"]["data"]) {
        data["Response"]["instance"]["data"]["socketInfo"] = new Object;
        
        for (let i in data["Response"]["sockets"]["data"]["sockets"]) {
            // console.log(data["Response"]["sockets"]["data"]["sockets"][i])
            
            if (data["Response"]["sockets"]["data"]["sockets"][i]["plugHash"]) {
                const promise = GetItem(data["Response"]["sockets"]["data"]["sockets"][i]["plugHash"]);
            
                data["Response"]["instance"]["data"]["socketInfo"][i] = await promise;
            }
        }
    }

    if (data["Response"]["plugObjectives"] && data["Response"]["plugObjectives"]["data"]) {
        data["Response"]["instance"]["data"]["plugObjectives"] = data["Response"]["plugObjectives"]["data"];

        if (data["Response"]["instance"]["data"]["plugObjectives"]["objectivesPerPlug"]) {
            for (let i in data["Response"]["instance"]["data"]["plugObjectives"]) {
                if (data["Response"]["instance"]["data"]["plugObjectives"].length === 3) {
                    console.log("test")
                }
            }
        }
    }

    if (data["Response"]["instance"]["data"]["overrideStyleItemHash"]) {
        const promise = GetItem(data["Response"]["instance"]["data"]["overrideStyleItemHash"]);

        data["Response"]["instance"]["data"]["overrideStyle"] = await promise;
    }

    const endTime = performance.now();
    perfStart[ItemInstance.name] = perfStart[ItemInstance.name] == null ? 
        startTime : Math.min(perfStart[ItemInstance.name], startTime);
    perfEnd[ItemInstance.name] = perfEnd[ItemInstance.name] == null ? 
        endTime : Math.max(perfStart[ItemInstance.name], endTime);
    return data["Response"]["instance"]["data"];
}

export async function TransferItem(characterId: string, itemInfo: any, itemLocation: ItemLocation): Promise<boolean> {
    // Unnecessary transfer
    switch(itemLocation){
        case ItemLocation.EQUIPPED:
            if (itemInfo["isEquipped"] && itemInfo["character"] === characterId){
                console.log("Item is already equipped");
                return false;    
            }
            break;
        case ItemLocation.INVENTORY:
            if (itemInfo["location"] === ItemLocation.INVENTORY && itemInfo["character"] === characterId && !itemInfo["isEquipped"]){
                console.log("Item is already in the character inventory");
                return false;
            }
            break;
        case ItemLocation.VAULT:
            if(itemInfo["location"] === ItemLocation.VAULT){
                console.log("Item is already in the vault");
                return false;
            }
            break;
    }
    // Handle equipped Item
    if (itemInfo["isEquipped"]){
        console.log("Item is equipped, not implemented yet");
        return false;
    }
    // Equipping Item
    if (itemLocation === ItemLocation.EQUIPPED){
        return EquipItem(characterId, itemInfo);
    } else if (itemLocation === ItemLocation.INVENTORY) {
        // Handle inventory Item
        if (itemInfo["location"] == ItemLocation.INVENTORY) {
            // Move from character to character
            // Move to vault first
            var result = await VaultTransfer(itemInfo["itemInstanceId"], itemInfo["itemHash"], true, itemInfo["character"]);
            if (result) {
                // Then move to character
                return VaultTransfer(itemInfo["itemInstanceId"], itemInfo["itemHash"], false, characterId);
            } else {
                console.log("Failed to transfer item to the vault");
                return false;
            }
        } else {
            // Move from vault to character
            return VaultTransfer(itemInfo["itemInstanceId"], itemInfo["itemHash"], false, characterId);
        }
    } else {
        // Move to vault
        return VaultTransfer(itemInfo["itemInstanceId"], itemInfo["itemHash"], true, characterId);
    }
}

export async function EquipItem(characterId: string, itemInfo: any): Promise<boolean> {
    if(itemInfo["character"] != characterId){
        var result = await VaultTransfer(itemInfo["itemInstanceId"], itemInfo["itemHash"], true, itemInfo["character"]);
        if(!result){
            console.log("Failed to transfer item to the vault");
            return false;
        }
        result = await VaultTransfer(itemInfo["itemInstanceId"], itemInfo["itemHash"], false, characterId);
        if(!result){
            console.log("Failed to transfer item from the vault");
            return false;
        }
        return EquipItemFromInventory(itemInfo["itemInstanceId"], characterId);
    }else{
        return EquipItemFromInventory(itemInfo["itemInstanceId"], characterId);
    }
}

async function EquipItemFromInventory(itemInstanceId: string, characterId: string): Promise<boolean> {
    const body = {
        itemId: itemInstanceId,
        characterId: characterId,
        membershipType: GetMembership()["membershipType"],
    };

    console.log(body.toString());

    const response = await fetch(base["url"] + `/Destiny2/Actions/Items/EquipItem/`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "x-api-key": base["key"],
            authorization: `Bearer ${GetData(keyList.token)}`
        }
    })
    var result = await response.json();
    console.log(result);
    return result.ok;
}

export async function VaultTransfer(itemId: string, itemHash: string, toVault: boolean, characterId: string): Promise<boolean> {
    const body = {
        itemReferenceHash: itemHash,
        itemId: itemId,
        characterId: characterId,
        transferToVault: toVault,
        stackSize: 1,
        membershipType: GetMembership()["membershipType"],
    };

    console.log(body.toString());

    const response = await fetch(base["url"] + `/Destiny2/Actions/Items/TransferItem/`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "x-api-key": base["key"],
            authorization: `Bearer ${GetData(keyList.token)}`
        }
    })

    var result = await response.json();
    console.log(result);

    return await response.ok;
}