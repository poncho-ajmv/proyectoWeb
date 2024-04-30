import React from "react";
import SearchBar from "./SearchBar"; // Importar el componente SearchBar
import "./Menu.css"; // Importar estilos

function Header({ setMovies }) {
    return (
        <header>
            <div className="menu">
                <ul>
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                    <li className="search-bar-container"> {/* Añade un contenedor para la barra de búsqueda */}
                        <SearchBar setMovies={setMovies} />
                    </li>
                </ul>
            </div>
            
        </header>
    );
}

export default Header;
