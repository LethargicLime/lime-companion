import {
    useContext
} from 'react';

const base = {
    "url": "https://www.bungie.net/Platform",
    "key": `ace1abe8389b458fa91b621887738eb2`,
    "oAuth": "https://www.bungie.net/en/OAuth/Authorize",
    "refresh": "https://www.bungie.net/Platform/App/OAuth/token/",
    "oAuthId": 45568
}

export async function retrieveAuth() {
    fetch("https://www.bungie.net/Platform/App/OAuth/Token.", {
        method: "POST",
        headers: {
            "x-api-key": base["key"],
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic 45568`
        }, body: new URLSearchParams({
            "client_id": "45568",
            "grant_type": "authorization_code",
            "code": ``
        }).toString()
    }).then(function(response) {
        console.log(response)

        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
}

export async function Fetch() {
    const options = {
        "method": "GET",
        "x-api-key": base["key"],
        "authorization": "grant_type=authorization_code&code=45568"
    }

    const manifest = await fetch(base["url"] + "/Destiny2/Manifest", options)
    const data = await manifest.json();

    console.log(data);
}

export async function GetCharacterInfo() {
    const options = {
        "method": "GET",
        "headers": {
            "x-api-key": base["key"],
        },
        "authorization": "grant_type=authorization_code&code=45568"
    }

    const response = await fetch(base["url"] + "/Destiny2/3/Profile/4611686018484567966/?components=200", options)
    const data = await response.json();

    //console.log(data);

    return data["Response"]["characters"]["data"];
}

export async function GetVerboseInformation() {
    const options = {
        "method": "GET",
        "headers": {
            "x-api-key": base["key"],
        },
        "authorization": "grant_type=authorization_code&code=45568"
    }

    const response = await fetch(base["url"] + "/Destiny2/3/Profile/4611686018484567966/?components=205,201", options)
    const data = await response.json();

    console.log(data);

    return data;
}

export async function GetItem(id: string) {
    const options = {
        "method": "GET",
        "headers": {
            "x-api-key": base["key"]
        },
        "Authorization": "grant_type=authorization_code&code=45568"
    }

    const response = await fetch(base["url"] + `/Destiny2/Manifest/DestinyInventoryItemDefinition/${id}/`, options)
    const item = await response.json();

    // console.log(item);

    return item["Response"];
}