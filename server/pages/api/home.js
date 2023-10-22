"use strict";(()=>{var e={};e.id=383,e.ids=[383],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},580:e=>{e.exports=require("prop-types")},6689:e=>{e.exports=require("react")},6405:e=>{e.exports=require("react-dom")},6655:(e,t,a)=>{a.r(t),a.d(t,{config:()=>S,default:()=>C,routeModule:()=>w});var i={};a.r(i),a.d(i,{HomePage:()=>HomePage,default:()=>y});var r=a(1802),s=a(7153),n=a(6249);let o=require("react/jsx-runtime");var l=a(8719);let CloseSidebarButton=({onClick:e})=>(0,o.jsxs)(o.Fragment,{children:[o.jsx("button",{className:"fixed top-[42px] left-[335px] z-50 h-7 w-7",onClick:e,children:o.jsx(l.Z,{})}),o.jsx("div",{onClick:e,className:"absolute top-0 left-0 z-10 w-full bg-black opacity-70 sm:hidden"})]}),SidebarButton=({text:e,icon:t,onClick:a,className:i})=>o.jsx("button",{className:`flex justify-between w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10 ${i}`,onClick:a,children:(0,o.jsxs)("div",{className:"flex items-center gap-3",children:[t,o.jsx("span",{children:e})]})});var c=a(6689),d=a(1383);let LHS_SettingsButton=()=>{let[e,t]=(0,c.useState)(!1);return o.jsx("div",{className:"relative flex flex-col items center",children:o.jsx(SidebarButton,{text:"Settings",icon:o.jsx("div",{children:o.jsx(d.Z,{size:23})}),onClick:()=>{}})})};var x=a(5194);let LHS_Login=()=>o.jsx("div",{className:"relative flex flex-col items center",children:o.jsx(SidebarButton,{text:"Login",icon:o.jsx("div",{children:o.jsx(x.Z,{})}),onClick:()=>{}})});var h=a(1239);let u={url:"https://www.bungie.net/Platform",key:"ace1abe8389b458fa91b621887738eb2"};async function Fetch(){let e={method:"GET","x-api-key":u.key,authorization:"grant_type=authorization_code&code=45568"},t=await fetch(u.url+"/Destiny2/Manifest",e),a=await t.json();console.log(a)}async function GetCharacterInfo(){let e={method:"GET",headers:{"x-api-key":u.key},authorization:"grant_type=authorization_code&code=45568"},t=await fetch(u.url+"/Destiny2/3/Profile/4611686018484567966/?components=200",e),a=await t.json();return a.Response.characters.data}async function GetVerboseInformation(){let e={method:"GET",headers:{"x-api-key":u.key},authorization:"grant_type=authorization_code&code=45568"},t=await fetch(u.url+"/Destiny2/3/Profile/4611686018484567966/?components=205,201",e),a=await t.json();return console.log(a),a}async function GetItem(e){let t={method:"GET",headers:{"x-api-key":u.key},Authorization:"grant_type=authorization_code&code=45568"},a=await fetch(u.url+`/Destiny2/Manifest/DestinyInventoryItemDefinition/${e}/`,t),i=await a.json();return i.Response}let LHS_ReloadManifest=()=>o.jsx("div",{className:"relative flex flex-col items center",children:o.jsx(SidebarButton,{text:"Fetch Manifest",icon:o.jsx("div",{children:o.jsx(h.Z,{})}),onClick:()=>{Fetch()}})}),LHS_ReloadCharacters=()=>o.jsx("div",{className:"relative flex flex-col items center",children:o.jsx(SidebarButton,{text:"Reload Character Info",icon:o.jsx("div",{children:o.jsx(h.Z,{})})})}),SidebarImageButton=({text:e,race:t,light:a,image:i,onClick:r,className:s})=>(0,o.jsxs)("button",{className:`flex justify-between w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10 ${s}`,onClick:r,style:{height:"64px",backgroundImage:`url(${i})`,backgroundSize:"314px 64px",marginTop:"20px"},children:[(0,o.jsxs)("div",{style:{marginLeft:"65px",textAlign:"center"},children:[o.jsx("div",{style:{fontWeight:"700"},children:e}),o.jsx("div",{style:{marginTop:"10px"},children:t})]}),(0,o.jsxs)("div",{style:{color:"#f0dc2e",fontSize:"19px",fontWeight:"700",marginRight:"4px"},children:["✧  ",a]})]}),p=(0,c.createContext)(void 0),f=(0,c.createContext)({characters:{},updateCharacters:()=>{}}),m=(0,c.createContext)(void 0),g=(0,c.createContext)({verbose:{},updateVerbose:()=>{}}),LhsSidebar=()=>{let{characters:e,updateCharacters:t}=(0,c.useContext)(f),{sidebarOpen:a,toggleSidebar:i}=(0,c.useContext)(p),{chosenCharacter:r,setChosenCharacter:s}=(0,c.useContext)(m),{verbose:n,updateVerbose:l}=(0,c.useContext)(g),[d,x]=(0,c.useState)(!1),characterInfo=()=>{GetCharacterInfo().then(e=>{t(e)}),GetVerboseInformation().then(e=>{l(e)})};(0,c.useEffect)(()=>{let fetchCharacterInfo=async()=>{let e=await GetCharacterInfo(),a=await GetVerboseInformation();t(e),l(a),x(!0)};d||fetchCharacterInfo()},[n,e,d]);let getEmblem=t=>"http://bungie.net"+e[t].emblemBackgroundPath,getClass=t=>{let a=e[t].classType;return"0"==a?"Titan":"1"==a?"Hunter":"Warlock"},getRace=t=>{let a=e[t].raceType;return"0"==a?"Human":"1"==a?"Awoken":"Exo"};return(0,o.jsxs)("div",{className:`fixed top-0 left-0 z-40 flex h-full w-[330px] flex-none flex-col space-y-2 p-2 duration-1000 sidebar ${a?"":"sidebar-closed"}`,children:[o.jsx(LHS_Login,{}),o.jsx("div",{className:"flex-grow flex-grow-1 overflow-auto",children:Object.keys(e).map((t,a)=>o.jsx(SidebarImageButton,{text:getClass(t),race:getRace(t),light:e[t].light,image:getEmblem(t),onClick:()=>s(t)},t))}),o.jsx("div",{onClick:()=>{characterInfo(),x(!1)},children:o.jsx(LHS_ReloadCharacters,{})}),o.jsx(LHS_ReloadManifest,{}),o.jsx(LHS_SettingsButton,{}),o.jsx(CloseSidebarButton,{onClick:()=>i(!a)})]})};var j=a(5525),v=a.n(j);let CharacterInventory=()=>{let{chosenCharacter:e}=(0,c.useContext)(m),{characters:t,updateCharacters:a}=(0,c.useContext)(f),{verbose:i}=(0,c.useContext)(g),[r,s]=(0,c.useState)([]),[n,l]=(0,c.useState)([]),[d,x]=(0,c.useState)([]),[h,u]=(0,c.useState)(!0),[p,j]=(0,c.useState)(1);return((0,c.useEffect)(()=>{j(.25);let e=setTimeout(()=>j(1),250);return()=>clearTimeout(e)},[e]),(0,c.useEffect)(()=>{u(!0),console.log(i),i&&i.Response&&i.Response.characterEquipment.data[e]&&i.Response.characterEquipment.data[e].items&&(s(i.Response.characterEquipment.data[e].items),u(!1))},[i,e,t]),(0,c.useEffect)(()=>{let fetchItems=async()=>{if(r.length>0){let e=r.map(e=>GetItem(e.itemHash)),t=await Promise.all(e);l(t)}};fetchItems()},[r]),h)?o.jsx("div",{style:{paddingLeft:"45px",paddingTop:"30px",fontWeight:"700"},children:"Select a character"}):o.jsx("div",{className:"",style:{paddingLeft:"45px",paddingTop:"30px",fontWeight:"700",opacity:p,transition:"opacity 0.25s ease-out"},children:n.length>0?o.jsx("div",{children:[,,,].fill(0).map((e,t)=>(0,o.jsxs)("div",{style:{display:"flex",marginBottom:"20px"},children:[(0,o.jsxs)("div",{style:{display:"inline-block"},children:[o.jsx("div",{children:o.jsx(v(),{src:`https://bungie.net${n[t].displayProperties.icon}`,width:70,height:70,alt:"Kinetic",className:"gear-icon"})}),o.jsx("div",{style:{height:"14px",fontSize:"7px",fontWeight:"500",backgroundColor:"grey",color:"white",display:"flex",alignItems:"center",justifyContent:"center"},children:n[t].displayProperties.name})]}),o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 60px)",gridGap:"1px",marginLeft:"14px"},children:Array(9).fill(0).map((e,a)=>o.jsx(v(),{src:`https://bungie.net${n[t].displayProperties.icon}`,width:55,height:55,alt:"Kinetic",className:"gear-icon"},a))})]},t))}):""})},Main_Page=()=>{let{sidebarOpen:e}=(0,c.useContext)(p);return o.jsx(o.Fragment,{children:o.jsx("div",{className:"",style:{backgroundColor:"#adaca6",height:"calc(100vh - 50px)"},children:o.jsx("div",{className:`transistion-all duration-1000 ${e?"pushed":""}`,style:{maxWidth:"100vh"},children:o.jsx(CharacterInventory,{})})})})},Navbar_Navbar=()=>{let{sidebarOpen:e}=(0,c.useContext)(p),{characters:t}=(0,c.useContext)(f),{chosenCharacter:a}=(0,c.useContext)(m),[i,r]=(0,c.useState)(!1);return o.jsx("div",{className:"top-0 z-20 navbar",children:(0,o.jsxs)("div",{className:`transition-all duration-1000 ${e?"pushed":""}`,style:{color:"white",fontSize:"17px",marginLeft:"10px",marginTop:"13px"},children:[o.jsx("div",{style:{fontWeight:"700"},children:"Lime Companion"}),""===a?"":(0,o.jsxs)("div",{style:{fontWeight:"700",marginLeft:"10px",marginTop:"0px",fontSize:"17px",color:"#406da8"},children:[1===t[a].classType&&"Hunter",0===t[a].classType&&"Titan",2===t[a].classType&&"Warlock"]})]})})},HomePage=()=>{let[e,t]=(0,c.useState)(!0),[a,i]=(0,c.useState)([]),[r,s]=(0,c.useState)(""),[n,l]=(0,c.useState)([]);return(0,c.useEffect)(()=>{let fetchCharacters=async()=>{let e=await GetCharacterInfo();i(e)};fetchCharacters()},[]),(0,c.useEffect)(()=>{let fetchVerbose=async()=>{let e=await GetVerboseInformation();l(e)};fetchVerbose()},[]),o.jsx("div",{children:o.jsx(p.Provider,{value:{sidebarOpen:e,toggleSidebar:()=>t(!e)},children:o.jsx(f.Provider,{value:{characters:a,updateCharacters:i},children:o.jsx(m.Provider,{value:{chosenCharacter:r,setChosenCharacter:s},children:(0,o.jsxs)(g.Provider,{value:{verbose:n,updateVerbose:l},children:[o.jsx(LhsSidebar,{}),(0,o.jsxs)("div",{children:[o.jsx(Navbar_Navbar,{}),o.jsx(Main_Page,{})]})]})})})})})},y=HomePage,b=r.PagesAPIRouteModule,C=(0,n.l)(i,"default"),S=(0,n.l)(i,"config"),w=new b({definition:{kind:s.x.PAGES_API,page:"/api/home",pathname:"/api/home",bundlePath:"",filename:""},userland:i})}};var t=require("../../webpack-api-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),a=t.X(0,[227],()=>__webpack_exec__(6655));module.exports=a})();