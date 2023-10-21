import { SidebarButton } from "./SidebarButtons";

import { useState } from "react";

import { IconReload } from "@tabler/icons-react";

import { Fetch } from "../Destiny/Fetch";

export const ReloadManifest = () => {

    const handleReloadManifest = () => {
        Fetch();
    }

    return (
        <div className="relative flex flex-col items center">
            <SidebarButton 
                text="Fetch Manifest"
                icon={<div><IconReload /></div>}
                onClick={handleReloadManifest}
            ></SidebarButton>
        </div>
    )
}

export default ReloadManifest;