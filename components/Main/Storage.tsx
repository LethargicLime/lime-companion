export const keyList = {
    storageRoot: "user_info",
    lastUser: "previous_id",
    token: "access_token",
    refreshToken: "refresh_token",
    id: "bungie_id",
    memberships: "memberships"
}

let bungie_id:string = null;
let membership_index = 0;
let userList:JSON = null;
let storage:JSON = null;

export function InitStorage(membership_id: string = null){
    // Init storage if it doesn't exist
    if(!(keyList.storageRoot in localStorage)){
        localStorage.setItem(keyList.storageRoot, JSON.stringify({}));
    }
    // Get user list 
    userList = JSON.parse(localStorage.getItem(keyList.storageRoot));
    // Use previous user as default user if it exists
    if(membership_id == null){
        membership_id =  localStorage.getItem(keyList.lastUser);
    }
    if(membership_id != null)
    {
        bungie_id = membership_id in userList ? membership_id : null;
        if(bungie_id != null){
            storage = userList[bungie_id];
        }
    }
    if(storage == null){
        storage = {} as JSON;
    }
    window.onbeforeunload = function(){
        if(bungie_id != null){
            userList[bungie_id] = storage;
        }
        localStorage.setItem(keyList.storageRoot, JSON.stringify(userList));
        localStorage.setItem(keyList.lastUser, bungie_id);
    };
}

export function GetBungieId():string{
    return bungie_id;
}

export function GetMembership(){
    return storage[keyList.memberships][membership_index];
}

export function ChangeUser(membership_id: string){
    bungie_id = membership_id;
    if(bungie_id in userList){
        storage = userList[bungie_id];
    }
}

export function StoreData(key: string, value: any, expireTimeSecond: number = -1):void{
    if(bungie_id == null) return;
    storage[key] = value;
    if(expireTimeSecond != -1){
        SetValid(key, expireTimeSecond);
    }
}

export function RetrieveData(key: string):any{
    if(bungie_id == null) return null;
    var value = key in storage ? storage[key] : null;
    if(value == null || !IsValid(key)) return null;
    return value;
}

export function IsValid(key: string):boolean{
    if(bungie_id == null) return false;
    var value = key + "_expire" in storage ? storage[key + "_expire"] : null;
    if(value == null) return true;
    return Date.now() < Number(value);
}

export function SetValid(key: string, timeSecond: number):void{
    if(bungie_id == null) return;
    storage[key + "_expire"] = (Date.now() + timeSecond * 1000).toString();
}

export function RemoveData(key: string):void{
    if(bungie_id == null) return;
    delete storage[key];
    delete storage[key + "_expire"];
}

export function PrintExpireTime(key: string):void{
    if(bungie_id == null) return;
    var value = key + "_expire" in storage ? storage[key + "_expire"] : null;
    if(value == null) return;
    console.log(`${key} expires at ${new Date(Number(value))}`);
}