// SearchBar.js
import React, { useState } from "react";

function SearchBar({ setMovies }) {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        // Lógica para buscar películas y actualizar el estado de películas
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies..."
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
