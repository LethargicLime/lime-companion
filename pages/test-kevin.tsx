import { PrintExpireTime, RetrieveData, StoreData } from "@/components/Main/Storage";

let base = {
    "url": "https://www.bungie.net/Platform",
    "key": process.env.NEXT_PUBLIC_TEST_KEY,
    "oAuth": "https://www.bungie.net/en/OAuth/Authorize",
    "refresh": "https://www.bungie.net/Platform/App/OAuth/token/",
    "token": null,
    "refreshToken": null,
    "code": null
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
        base.code = currentURL.get("code");
        if(base.code == null){
            TestAuthorize();
            return;
        }
    }else{
        base.token = token;
        return;
    }
    
    const code = base.code;
    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: process.env.NEXT_PUBLIC_TEST_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_TEST_API_SECRET
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
        console.log(r);
        base.token = r["access_token"];
        base.refreshToken = r["refresh_token"];
        StoreData('access_token', base.token, r["expires_in"]);
        StoreData('refresh_token', base.refreshToken, r["refresh_expires_in"]);
        PrintExpireTime('access_token');
        PrintExpireTime('refresh_token');
        return r;
    } else {
        console.log("Failure: " + response);
    }
}

export async function TestRemoveLink() {
    let params = new URLSearchParams(location.search);
    params.delete('code');
    history.pushState({}, '', `${location.pathname}`);
}

export default function TestKevin() {
    // @ts-ignore
    (async () => {
        await TestGetToken();
        await TestRemoveLink();
    })();
    return (
        <div>
            <h1>Hello There</h1>
            <button onClick={() =>{
                console.log(base.code);
            }}>Print Code</button>
            <br></br>
            <button onClick={() =>{
                console.log(base.token);
            }}>Print Token</button>
        </div>
    )
}