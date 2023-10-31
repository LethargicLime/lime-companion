import { SidebarButton } from "./SidebarButtons";

import { useState } from "react";

import { IconBrandSteam } from "@tabler/icons-react";

export const SignOut = () => {

    const handleLoginButton = () => {
        
    }

    return (
        <div className="relative flex flex-col items center">
            <SidebarButton 
                text="Sign Out"
                icon={<div><IconBrandSteam /></div>}
                onClick={handleLoginButton}
            ></SidebarButton>
        </div>
    )
}

export default SignOut;