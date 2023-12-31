let base = {
    "url": "https://www.bungie.net/Platform",
    "key": `ace1abe8389b458fa91b621887738eb2`,
    "oAuth": "https://www.bungie.net/en/OAuth/Authorize",
    "refresh": "https://www.bungie.net/Platform/App/OAuth/token/",
    "oAuthClientId": 45568,
    "token": ""

}

export async function authorize() {

    const queryParams = new URLSearchParams({
        client_id: "45568",
        response_type: 'code',
    })

    const href = await `https://www.bungie.net/en/OAuth/Authorize?${queryParams.toString()}`;

    location.href = href;
}

export async function GetToken() {
    const urlInfo = new URLSearchParams(location.search);

    const code = urlInfo.get("code");

    // console.log(code);

    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: '45568',
        client_secret: 'qC6Cr6FAUr1-Ljjt.-czzDEObFwbpEB3MJ4M2CAjdUI'
    })

    const response = await fetch('https://www.bungie.net/platform/app/oauth/token/', {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    if (response.ok) {
        const r = await response.json();

        base["token"] = await r["access_token"];

        console.log(base["token"]);

        return r;
    } else {
        // console.log("Failure: " + response);
    }
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

export async function GetCharacterInfo(id: string) {
    const options = {
        "method": "GET",
        "headers": {
            "x-api-key": base["key"],
            authorization: `Bearer ${base["token"]}`
        },
    }

    const response = await fetch(base["url"] + `/Destiny2/3/Profile/${id}/?components=200`, options)
    const data = await response.json();

    // console.log(data);

    return data["Response"]["characters"]["data"];
}

export async function GetVerboseInformation(id: string) {
    console.log("test " + base["token"])

    const options = {
        "method": "GET",
        "headers": {
            "x-api-key": base["key"],
            authorization: `Bearer ${base["token"]}`
        },
        
    }

    const response = await fetch(base["url"] + `/Destiny2/3/Profile/${id}/?components=205,201`, options);
    const data = await response.json();

    // console.log(data);

    return data;
}

export async function GetItem(id: string) {
    const options = {
        method: "GET",
        headers: {
            "x-api-key": base["key"]
        },
    }

    const response = await fetch(base["url"] + `/Destiny2/Manifest/DestinyInventoryItemDefinition/${id}/`, options)
    const item = await response.json();

    // console.log(item);

    return item["Response"];
}

export async function SpecificMemberId(id: string) {
    const response = await fetch(base["url"] + `/Destiny2/3/Profile/${id}/LinkedProfiles/?getAllMemberships=false`, {
        method: "GET",
        headers: {
            "x-api-key": base["key"]
        }
    })
    
    const data = await response.json();

    return await data["Response"]["profiles"][0]["membershipId"];
}

export async function ItemInstance(id: string, item: string) {
    // console.log(base["token"])

    const response = await fetch(base["url"] + `/Destiny2/3/Profile/${id}/Item/${item}/?components=300`, {
        method: "GET",
        headers: {
            "x-api-key": base["key"],
            authorization: `Bearer ${base["token"]}`
        }
    })

    const data = await response.json();

    // console.log(data);

    return data["Response"]["instance"]["data"];
}