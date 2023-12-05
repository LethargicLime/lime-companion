import { SidebarButton } from "./SidebarButtons";

import { useState } from "react";

import { IconReload } from "@tabler/icons-react";

import { Fetch, GetCharacterInfo } from "../Destiny/Fetch";

export const ReloadCharacters = () => {

    return (
        <div className="relative flex flex-col items center">
            <SidebarButton 
                text="Reload Character Info"
                icon={<div><IconReload /></div>}
            ></SidebarButton>
        </div>
    )
}

export default ReloadCharacters;