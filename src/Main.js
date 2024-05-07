import React from "react";
import MovieList from "./MovieList";
import MovieCarousel from "./MovieCarousel";
import MovieCard from "./MovieCard"; // Importa el componente MovieCard

function Main({ movies }) {
    return (
        <main>
            <>
                <MovieCard /> {/* Incluye el componente MovieCard aquí */}
                <MovieCarousel />
                <MovieList movies={movies} />
            </>
        </main>
    );
}

export default Main;
