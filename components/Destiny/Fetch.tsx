import { RemoveParams } from "../Main/Link";
import { ChangeUser, GetBungieId, GetMembership, RetrieveData, StoreData, keyList } from "../Main/Storage";

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
        console.log(`${key}:${perfEnd[key] - perfStart[key]}`)
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
            console.log(RetrieveData(keyList.token));    
            RemoveParams("code");
        } else {
            console.log("Failure: " + response);
        }
    }else{
        if(RetrieveData(keyList.token) != null){
            return;
        }else if(RetrieveData(keyList.refreshToken) != null){
            const body = new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: RetrieveData(keyList.refreshToken),
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
            authorization: `Bearer ${RetrieveData(keyList.token)}`
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
            authorization: `Bearer ${RetrieveData(keyList.token)}`
        },
        
    }

    const response = await fetch(base["url"] + `/Destiny2/${GetMembership()["membershipType"]}/Profile/${id}/?components=205,201`, options);
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

    const options = {
        method: "GET",
        headers: {
            "x-api-key": base["key"]
        },
    }

    const response = await fetch(base["url"] + `/Destiny2/Manifest/DestinyInventoryItemDefinition/${id}/`, options)
    const item = await response.json();

    // console.log(item);
    const endTime = performance.now();
    perfStart[GetItem.name] = perfStart[GetItem.name] == null ? 
        startTime : Math.min(perfStart[GetItem.name], startTime);
    perfEnd[GetItem.name] = perfEnd[GetItem.name] == null ? 
        endTime : Math.max(perfStart[GetItem.name], endTime);
    return item["Response"];
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

    const response = await fetch(base["url"] + `/Destiny2/Manifest/DestinyDamageTypeDefinition/${hash}/`, {
        method: "GET",
        headers: {
            "x-api-key": base["key"],
            authorization: `Bearer ${RetrieveData(keyList.token)}`
        }
    });

    const data = await response.json();
    
    const endTime = performance.now();
    perfStart[GetDamageType.name] = perfStart[GetDamageType.name] == null ? 
        startTime : Math.min(perfStart[GetDamageType.name], startTime);
    perfEnd[GetDamageType.name] = perfEnd[GetDamageType.name] == null ? 
        endTime : Math.max(perfStart[GetDamageType.name], endTime);
    return data["Response"];
}

export async function HasIntrinsicUpgrade(hash: string) {
    const startTime = performance.now();

    const response = await fetch(base["url"] + `${hash}`, {
        method: "GET",
        headers: {
            "x-api-key": base["key"],
            authorization: `Bearer ${RetrieveData(keyList.token)}`
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
            authorization: `Bearer ${RetrieveData(keyList.token)}`
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