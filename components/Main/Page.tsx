import {
    useState,
    useEffect,
    useContext
} from 'react';

import { CharacterInventory } from './CharacterInventory';

import SidebarContext from '../Providers/SidebarProvider';
import { ItemInfo } from './ItemInfo';
import SelectedContext from '../Providers/SelectedProvider';

export const Page = () => {
    const { sidebarOpen } = useContext(SidebarContext)

    const [ item, setItem ] = useState({});

    return (
        <>
            <div className={"flex z-0 relative"} style={{
                backgroundColor: "#363636",
                height: "calc(100vh - 50px)"
            }}>
                <div className={`z-0 flex flex-row transistion-all duration-1000 ${sidebarOpen ? "pushed" : ""}`} style={{
                    maxWidth: "100vh"
                }}>
                    <SelectedContext.Provider value={{ item, setItem }}>
                        <CharacterInventory />
                        <div className="">
                            <ItemInfo />
                        </div>
                    </SelectedContext.Provider>
                </div>
            </div>
        </>
    )
}

export default Page;