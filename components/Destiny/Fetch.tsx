let base = {
    "url": "https://www.bungie.net/Platform",
    "key": process.env.NEXT_PUBLIC_API_KEY,
    "oAuth": "https://www.bungie.net/en/OAuth/Authorize",
    "refresh": "https://www.bungie.net/Platform/App/OAuth/token/",
    "token": ""

}

export async function authorize() {

    const queryParams = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
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
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_API_SECRET
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

    // console.log(data);

    return data["Response"]["profiles"][0]["membershipId"];
}

export async function GetDamageType(hash: string) {

    const response = await fetch(base["url"] + `/Destiny2/Manifest/DestinyDamageTypeDefinition/${hash}/`, {
        method: "GET",
        headers: {
            "x-api-key": base["key"],
            authorization: `Bearer ${base["token"]}`
        }
    });

    const data = await response.json();

    return data["Response"];
}

export async function HasIntrinsicUpgrade(hash: string) {

    const response = await fetch(base["url"] + `${hash}`, {
        method: "GET",
        headers: {
            "x-api-key": base["key"],
            authorization: `Bearer ${base["token"]}`
        }
    })

    const data = await response.json();

    console.log(data);
}

export async function ItemInstance(id: string, item: string) {

    const response = await fetch(base["url"] + `/Destiny2/3/Profile/${id}/Item/${item}/?components=300,305,307`, {
        method: "GET",
        headers: {
            "x-api-key": base["key"],
            authorization: `Bearer ${base["token"]}`
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

    if (data["Response"]["instance"]["data"]["overrideStyleItemHash"]) {
        const promise = GetItem(data["Response"]["instance"]["data"]["overrideStyleItemHash"]);

        data["Response"]["instance"]["data"]["overrideStyle"] = await promise;
    }

    return data["Response"]["instance"]["data"];
}