import React, { useState, useEffect } from "react";
import movies from "./moviesData";

const MovieCarousel = () => {
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [currentDirectors, setCurrentDirectors] = useState([]);
    const [currentCast, setCurrentCast] = useState([]);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const movie = movies[currentMovieIndex];
            const { directors, cast } = await getMovieDetails(movie);
            setCurrentDirectors(directors);
            setCurrentCast(cast);
        };

        fetchMovieDetails();
    }, [currentMovieIndex]);

    const handleNext = () => {
        setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };

    const handlePrev = () => {
        setCurrentMovieIndex((prevIndex) =>
            prevIndex === 0 ? movies.length - 1 : prevIndex - 1
        );
    };

    const getMovieDetails = async (movie) => {
        const apiKey = "674684d28cd5c404ad1bf06cd1a5d482";
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            movie.title
        )}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results.length > 0) {
            const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${data.results[0].id}?api_key=${apiKey}&append_to_response=credits,reviews`;
            const detailsResponse = await fetch(movieDetailsUrl);
            const detailsData = await detailsResponse.json();
            const directors = detailsData.credits.crew
                .filter((person) => person.job === "Director")
                .map((director) => director.name);
            const cast = detailsData.credits.cast.slice(0, 5).map((actor) => ({
                name: actor.name,
                character: actor.character,
            }));
            return { directors, cast };
        } else {
            console.log(
                `No se encontraron detalles para la película ${movie.title}`
            );
            return { directors: [], cast: [] };
        }
    };

    const currentMovie = movies[currentMovieIndex];

    return (
        <div className="movie-carousel">
            <div className="movie-details">
                <div className="poster-container">
                    <img
                        className="poster"
                        src={currentMovie.poster}
                        alt="Movie Poster"
                    />
                </div>

                <div className="trailer-container">
                    <iframe
                        className="trailer"
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${currentMovie.youtubeId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="details">
                    <h2>{currentMovie.title}</h2>
                    <h3>Directors:</h3>
                    <ul>
                        {currentDirectors.map((director, index) => (
                            <li key={index}>{director}</li>
                        ))}
                    </ul>
                    <h3>Cast:</h3>
                    <ul>
                        {currentCast.map((actor, index) => (
                            <li key={index}>
                                {actor.name} - {actor.character}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="navigation-buttons">
                <button className="prev-btn" onClick={handlePrev}>
                    Previous
                </button>
                <button className="next-btn" onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default MovieCarousel;
