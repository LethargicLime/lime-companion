import { SidebarButton } from "./SidebarButtons";

import { useState } from "react";

import { IconSettings } from "@tabler/icons-react";

export const SettingsButton = () => {
    const [settings, openSettings] = useState(false);

    const handleSettingsButton = () => {

    }

    return (
        <div className="relative flex flex-col items center">
            <SidebarButton 
                text="Settings"
                icon={<div><IconSettings size={23} /></div>}
                onClick={handleSettingsButton}
            ></SidebarButton>
        </div>
    )
}

export default SettingsButton;