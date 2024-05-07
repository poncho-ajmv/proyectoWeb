import React from "react";
import SearchBar from "./SearchBar"; // Importar el componente SearchBar
import Dropdown from "./Dropdown";
import "./Menus.css";

function Header({ setMovies }) {

    const categories = ["Drama", "Comedia", "Infantil", "Sagas"];
    const languageOptions = ["Español", "Inglés"];

    return (
        <header className="menu">
            <img
                src="http://imgfz.com/i/OehyQAa.png"
                alt="Logo"
                className="logo"
            />
            <nav>
                <a href="#">
                    Inicio <span></span>
                </a>
                <Dropdown title="Categorías" options={categories} />
                <Dropdown
                    title="Idioma"
                    options={languageOptions}
                    
                />
            </nav>
            {/* Barra de búsqueda fuera de la "caja" */}
            <input type="text" className="search-bar" placeholder="Buscar..." />
            <button className="search-button">Buscar</button>
        </header>
    );
}

export default Header;
