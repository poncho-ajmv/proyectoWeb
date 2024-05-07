import React, { useState, useEffect } from "react";
import { movies } from "./moviesData";

const MovieCard = () => {
    const [randomMovies, setRandomMovies] = useState([]);

    useEffect(() => {
        generateRandomMovies();
    }, []);

    const generateRandomMovies = () => {
        const randomMoviesArray = [];
        while (randomMoviesArray.length < 5) {
            const randomIndex = Math.floor(Math.random() * movies.length);
            if (!randomMoviesArray.includes(randomIndex)) {
                randomMoviesArray.push(randomIndex);
            }
        }
        setRandomMovies(randomMoviesArray);
    };

    const handleClick = () => {
        generateRandomMovies();
    };

    return (
        <div className="movie-card">
            <h2>Random Movie Posters</h2>
            <div className="movie-posters">
                {randomMovies.map((index) => (
                    <img
                        key={index}
                        src={movies[index].poster}
                        alt={movies[index].title}
                        className="movie-poster"
                    />
                ))}
            </div>
            <button onClick={handleClick}>Next Random Movies</button>
        </div>
    );
};

export default MovieCard;
