export function StoreData(key: string, value: any, expireTimeSecond: number = -1):void{
    localStorage.setItem(key, JSON.stringify(value));
    if(expireTimeSecond != -1){
        SetValid(key, expireTimeSecond);
    }
}

export function RetrieveData(key: string):any{
    var value = localStorage.getItem(key);
    if(value == null || !IsValid(key)) return null;
    return JSON.parse(value);
}

export function IsValid(key: string):boolean{
    var value = localStorage.getItem(key + "_expire");
    if(value == null) return true;
    return Date.now() < Number(value);
}

export function SetValid(key: string, timeSecond: number):void{
    localStorage.setItem(key + "_expire", (Date.now() + timeSecond * 1000).toString());
}

export function RemoveData(key: string):void{
    localStorage.removeItem(key);
    localStorage.removeItem(key + "_expire");
}

export function PrintExpireTime(key: string):void{
    var value = localStorage.getItem(key + "_expire");
    if(value == null) return;
    console.log(`${key} expires at ${new Date(Number(value))}`);
}