export const keyList = {
    userRoot: "user_info",
    lastUser: "previous_id",
    token: "access_token",
    refreshToken: "refresh_token",
    id: "bungie_id",
    memberships: "memberships",
    item: "item",
    damageType: "damage_type",
}

let bungie_id:string = null;
let membership_index = 0;
let userList:JSON = null;
let storage:JSON = null;
let db:IDBDatabase = null;

export function InitStorage(membership_id: string = null){
    // Init user storage if it doesn't exist
    if(!(keyList.userRoot in localStorage)){
        localStorage.setItem(keyList.userRoot, JSON.stringify({}));
    }
    // Init Database
    const request = indexedDB.open("DestinyDatabase", 2);
    request.onupgradeneeded = () => {
        // Trigger if updated or created
        db = request.result;
        db.createObjectStore(keyList.item);
        db.createObjectStore(keyList.damageType);
    };
    request.onerror = () => {
      console.error("IndexedDB not supported.");
    };
    // Setup database transaction and store
    request.onsuccess = () => {
        db = request.result;
    };
    // Get user list 
    userList = JSON.parse(localStorage.getItem(keyList.userRoot));
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
        // Save database
        db.close();
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

const GetDBResult = (root,key) =>{
    return new Promise((resolve, reject) => {
        if(db == null) reject(null);
        var transaction = db.transaction(root, "readonly");
        var store = transaction.objectStore(root);
        let req = store.get(key);
        req.onsuccess = () =>{
            transaction.commit();
            resolve(req.result);
        }
        req.onerror = () =>{
            transaction.abort();
            console.error(`Failed to get ${key} from ${root}`);
            reject(null);
        }
    });
}

const SetDBResult = (root,key,value) =>{
    return new Promise((resolve, reject) => {
        if(db == null) reject(null);
        var transaction = db.transaction(root, "readwrite");
        var store = transaction.objectStore(root);
        let req = store.put(value, key);
        req.onsuccess = () =>{
            transaction.commit();
            resolve(req.result);
        }
        req.onerror = () =>{
            transaction.abort();
            console.error(`Failed to get ${key} from ${root}`);
            reject(null);
        }
    });
}


const RemoveDBResult = (root,key) =>{
    return new Promise((resolve, reject) => {
        if(db == null) reject(null);
        var transaction = db.transaction(root, "readwrite");
        var store = transaction.objectStore(root);
        let req = store.delete(key);
        req.onsuccess = () =>{
            transaction.commit();
            resolve(req.result);
        }
        req.onerror = () =>{
            transaction.abort();
            console.error(`Failed to get ${key} from ${root}`);
            reject(null);
        }
    });
}

export async function GetGlobalData(root: string, key: string):Promise<any>{
    if(db == null) return null;
    var result = await GetDBResult(root, key);
    return result;
}

export async function StoreGlobalData(root: string, key: string, value: any):Promise<any>{
    if(db == null) return null;
    var result = await SetDBResult(root, key, value);
    return result;
}

export function RemoveGlobalData(root: string, key: string):Promise<any>{
    if(db == null) return null;
    var result = RemoveDBResult(root, key);
    return result;
}

export function PrintExpireTime(key: string):void{
    if(bungie_id == null) return;
    var value = key + "_expire" in storage ? storage[key + "_expire"] : null;
    if(value == null) return;
    console.log(`${key} expires at ${new Date(Number(value))}`);
}