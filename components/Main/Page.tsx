import {
    useState,
    useEffect,
    useContext
} from 'react';

import { CharacterInventory } from './CharacterInventory';

import SidebarContext from '../Providers/SidebarProvider';

export const Page = () => {
    const { sidebarOpen } = useContext(SidebarContext)

    return (
        <>
            <div className={""} style={{
                backgroundColor: "#363636",
                height: "calc(100vh - 50px)"
            }}>
                <div className={`transistion-all duration-1000 ${sidebarOpen ? "pushed" : ""}`} style={{
                    maxWidth: "100vh"
                }}>
                    <CharacterInventory />
                </div>
            </div>
        </>
    )
}

export default Page;