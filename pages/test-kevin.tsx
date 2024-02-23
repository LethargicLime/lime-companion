import { ChangeUser, GetBungieId, InitStorage, PrintExpireTime, RetrieveData, StoreData, keyList } from "@/components/Main/Storage";
import { useEffect } from "react";

let base = {
    "url": "https://www.bungie.net/Platform",
    "key": process.env.NEXT_PUBLIC_TEST_KEY,
    "oAuth": "https://www.bungie.net/en/OAuth/Authorize",
    "refresh": "https://www.bungie.net/Platform/App/OAuth/token/",
}

export async function TestAuthorize() {
    const queryParams = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_TEST_CLIENT_ID,
        response_type: 'code',
    })

    const href = await `${base.oAuth}?${queryParams.toString()}`;
    location.href = href;
}

export async function TestGetToken() {
    const token = RetrieveData("access_token");
    if(token == null){
        const currentURL = new URLSearchParams(location.search);
        let code = currentURL.get("code");
        if(code == null){
            TestAuthorize();
            return;
        }
        const body = new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            client_id: process.env.NEXT_PUBLIC_TEST_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_TEST_API_SECRET
        })

        const response = await fetch('https://www.bungie.net/Platform/App/OAuth/token/', {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        if (response.ok) {
            const r = await response.json();
            console.log(r);
            ChangeUser(r["membership_id"]);
            StoreData(keyList.token, r["access_token"], r["expires_in"]);
            StoreData(keyList.refreshToken, r["refresh_token"], r["refresh_expires_in"]);
            PrintExpireTime(keyList.token);
            PrintExpireTime(keyList.refreshToken);
            return r;
        } else {
            console.log("Failure: " + response);
        }
    }
}

export async function TestRemoveLink() {
    let params = new URLSearchParams(location.search);
    params.delete('code');
    history.pushState({}, '', `${location.pathname}`);
}

export async function TestFetch() {
    var result = await fetch(`${base.url}/User/GetMembershipsById/${GetBungieId()}/-1/`,{
        method: "GET",
        headers: {
            "x-api-key": base.key
        }
    })
    if(result.ok){
        var json = await result.json();
        console.log(json);
    }
}

export default function TestKevin() {
    // @ts-ignore
    useEffect(async () =>{
        await InitStorage(null);
        await TestGetToken();
        await TestRemoveLink();
        await TestFetch();
    },[]);
    return (
        <div>
            <h1>Hello There</h1>
            <button onClick={() =>{
                console.log(RetrieveData(keyList.token));
            }}>Print Token</button>
        </div>
    )
}