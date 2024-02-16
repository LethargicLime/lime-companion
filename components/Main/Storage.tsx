export const keyList = {
    storageRoot: "userInfo",
    lastUser: "previousUser",
    token: "access_token",
    refreshToken: "refresh_token",
    Id: "membership_id",
}

let user:string = null;
let userList:JSON = null;
let storage:JSON = null;

export function InitStorage(membership_id: string){
    // Init storage if it doesn't exist
    if(!(keyList.storageRoot in localStorage)){
        localStorage.setItem(keyList.storageRoot, JSON.stringify({}));
    }
    // Get user list 
    userList = JSON.parse(localStorage.getItem(keyList.storageRoot));
    // Use first user as default user if it exists
    if(membership_id == null){
        membership_id =  localStorage.getItem(keyList.lastUser);
    }
    if(membership_id != null)
    {
        user = membership_id in userList ? membership_id : null;
        if(user != null){
            storage = userList[user];
        }
    }
    if(storage == null){
        storage = {} as JSON;
    }
    window.onbeforeunload = function(){
        if(user != null){
            userList[user] = storage;
        }
        localStorage.setItem(keyList.storageRoot, JSON.stringify(userList));
        localStorage.setItem(keyList.lastUser, user);
    };
}

export function ChangeUser(membership_id: string){
    user = membership_id;
    if(user in userList){
        storage = userList[user];
    }
}

export function StoreData(key: string, value: any, expireTimeSecond: number = -1):void{
    if(user == null) return;
    storage[key] = value;
    if(expireTimeSecond != -1){
        SetValid(key, expireTimeSecond);
    }
}

export function RetrieveData(key: string):any{
    if(user == null) return null;
    var value = key in storage ? storage[key] : null;
    if(value == null || !IsValid(key)) return null;
    return value;
}

export function IsValid(key: string):boolean{
    if(user == null) return false;
    var value = key + "_expire" in storage ? storage[key + "_expire"] : null;
    if(value == null) return true;
    return Date.now() < Number(value);
}

export function SetValid(key: string, timeSecond: number):void{
    if(user == null) return;
    storage[key + "_expire"] = (Date.now() + timeSecond * 1000).toString();
}

export function RemoveData(key: string):void{
    if(user == null) return;
    delete storage[key];
    delete storage[key + "_expire"];
}

export function PrintExpireTime(key: string):void{
    if(user == null) return;
    var value = key + "_expire" in storage ? storage[key + "_expire"] : null;
    if(value == null) return;
    console.log(`${key} expires at ${new Date(Number(value))}`);
}