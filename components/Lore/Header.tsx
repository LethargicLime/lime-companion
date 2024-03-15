import { useState } from "react";
import { Search } from "./Search";

export const Header = () => {
    const handleSearch = (query) => {
        console.log(query);
    }

    return (
        <div className={"top-0 h-50 bg-[#21201e]"}>
            <div className="flex items-center p-3 justify-end">
                <Search />
            </div>
        </div>
    )
}

export default Header;