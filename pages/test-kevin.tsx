let base = {
    "url": "https://www.bungie.net/Platform",
    "key": process.env.NEXT_PUBLIC_TEST_KEY,
    "oAuth": "https://www.bungie.net/en/OAuth/Authorize",
    "refresh": "https://www.bungie.net/Platform/App/OAuth/token/",
    "token": "",
    "code": ""
}

export async function TestAuthorize() {
    const queryParams = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_TEST_CLIENT_ID,
        response_type: 'code',
    })

    const href = await `${base.oAuth}?${queryParams.toString()}`;
    location.href = href;
}

export async function TestGetCode(){
    const currentURL = new URLSearchParams(location.search);
    const param1 = currentURL.get("code");
    base.code = param1;
    return param1;
}


export async function TestGetToken() {
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

        base.token = r["access_token"];
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
    TestGetCode().then(result => {
        var code:string = null;
        code = result;
        if(code == null){
            TestAuthorize();
            return;
        }
        TestGetToken();
        TestRemoveLink();
        // console.log("Code is:" + code);
    });
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