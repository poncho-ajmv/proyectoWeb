// App.js
import React, { useState } from "react";

//Hace los importes a los archivos necesarios
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import "./App.css";

function App() {
    const [movies, setMovies] = useState([]); // Lista de películas
    const [selectedMovie, setSelectedMovie] = useState(null); // Película seleccionada

    const handleSearch = (query) => {
        // Aquí puedes implementar la lógica para buscar películas
        console.log("Buscando películas con el query:", query);
    };

    return (
        <div className="App">
            <Header handleSearch={handleSearch} />
            <Main
                movies={movies}
                setMovies={setMovies}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
            />
            <Footer />
        </div>
    );
}

export default App;
