import {
    useContext,
    useEffect
} from 'react';

const base = {
    "url": "https://www.bungie.net/Platform",
    "key": `ace1abe8389b458fa91b621887738eb2`,
    "oAuth": "https://www.bungie.net/en/OAuth/Authorize",
    "refresh": "https://www.bungie.net/Platform/App/OAuth/token/",
    "oAuthClientId": 45568
}

export async function authorize() {

    const queryParams = new URLSearchParams({
        client_id: "45568",
        response_type: 'code',
    })

    const href = await `https://www.bungie.net/en/OAuth/Authorize?${queryParams.toString()}`;

    console.log(href)

    location.href = href;

    // const body = new URLSearchParams({
    //     grant_type: 'authorization_code',
    //     code: '3d3423da3a4aa07643b06d30d2ca12fd',
    //     client_id: '45568',
    //     client_secret: 'qC6Cr6FAUr1-Ljjt.-czzDEObFwbpEB3MJ4M2CAjdUI'
    // })

    // const response = await fetch('https://www.bungie.net/platform/app/oauth/token/', {
    //     method: 'POST',
    //     body,
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // });

    // console.log(response)

    // var tokenData = undefined;

    // if (typeof window !== "undefined" && window.location.href.includes("code=")) {
    //     await fetch("https://www.bungie.net/Platform/App/OAuth/Token/", {
    //         method: "POST",
    //         headers: {
    //             'X-API-Key': base["key"],
    //             'Content-Type': "application/x-www-form-urlencoded",
    //             'Authorization': `Basic ${window.btoa("45568:qC6Cr6FAUr1-Ljjt.-czzDEObFwbpEB3MJ4M2CAjdUI")}`
    //         },
    //         body: new URLSearchParams({
    //             client_id: "45568",
    //             client_secret: "qC6Cr6FAUr1-Ljjt.-czzDEObFwbpEB3MJ4M2CAjdUI",
    //             grant_type: "authorization_code",
    //             code: `3d3423da3a4aa07643b06d30d2ca12fd`
    //         }).toString()
    //     }).then(function(response) {
    //         console.log(response);
    //     })
    //     .then(function(data) {
    //         tokenData = data;
    //         console.log(data);
    //     })
    // }
}

export async function getToken() {

}

export async function Fetch() {
    const options = {
        "method": "GET",
        "x-api-key": base["key"],
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
        "authorization": "authorization_code"
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
        "Authorization": "authorization_code"
    }

    const response = await fetch(base["url"] + `/Destiny2/Manifest/DestinyInventoryItemDefinition/${id}/`, options)
    const item = await response.json();

    // console.log(item);

    return item["Response"];
}