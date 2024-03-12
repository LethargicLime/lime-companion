import { useState } from "react";

export const Search = () => {

    const [ query, setQuery ] = useState<string>("");

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(query);

        setQuery("");
    }

    return (
        <form onSubmit={handleSubmit} className="mr-3">
            <input className="pl-2 bg-[#4a4a4a] rounded w-[200px]"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <button type="submit" />
        </form>
    )
}

export default Search;