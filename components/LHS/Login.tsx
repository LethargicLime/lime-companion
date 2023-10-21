import { SidebarButton } from "./SidebarButtons";

import { useState } from "react";

import { IconBrandSteam } from "@tabler/icons-react";

export const Login = () => {

    const handleLoginButton = () => {

    }

    return (
        <div className="relative flex flex-col items center">
            <SidebarButton 
                text="Login"
                icon={<div><IconBrandSteam /></div>}
                onClick={handleLoginButton}
            ></SidebarButton>
        </div>
    )
}

export default Login;