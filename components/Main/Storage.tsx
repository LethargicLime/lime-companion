export const keyList = {
    userRoot: "user_info",
    lastUser: "previous_id",
    token: "access_token",
    refreshToken: "refresh_token",
    id: "bungie_id",
    memberships: "memberships",
    database: "database",
    item: "item",
    damageType: "damage_type",
}

let bungie_id:string = null;
let membership_index = 0;
let userList:JSON = null;
let storage:JSON = null;
let database:JSON = null;

export function InitStorage(membership_id: string = null){
    // Init user storage if it doesn't exist
    if(!(keyList.userRoot in localStorage)){
        localStorage.setItem(keyList.userRoot, JSON.stringify({}));
    }
    // Init
    if(!(keyList.database in localStorage)){
        localStorage.setItem(keyList.database, JSON.stringify({}));
    }
    // Get user list 
    userList = JSON.parse(localStorage.getItem(keyList.userRoot));
    database = JSON.parse(localStorage.getItem(keyList.database));
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
        localStorage.setItem(keyList.userRoot, JSON.stringify(userList));
        localStorage.setItem(keyList.lastUser, bungie_id);
        localStorage.setItem(keyList.database, JSON.stringify(database));
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

export function GetData(key: string):any{
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

export function GetGlobalData(root: string, key: string):any{
    return database[root] != null ? database[root][key] : null;
}

export function StoreGlobalData(root: string, key: string, value: any):void{
    if(database[root] == null) database[root] = {} as JSON;
    database[root][key] = value;
}

export function RemoveGlobalData(root: string, key: string):void{
    if(database[root] == null) return;
    delete database[root][key];
}

export function PrintExpireTime(key: string):void{
    if(bungie_id == null) return;
    var value = key + "_expire" in storage ? storage[key + "_expire"] : null;
    if(value == null) return;
    console.log(`${key} expires at ${new Date(Number(value))}`);
}