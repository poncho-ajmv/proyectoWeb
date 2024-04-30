// MovieCarousel.js
import React, { useState } from "react";
import movies from "./moviesData";

const MovieCarousel = () => {
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

    const handleNext = () => {
        setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    };

    const handlePrev = () => {
        setCurrentMovieIndex((prevIndex) =>
            prevIndex === 0 ? movies.length - 1 : prevIndex - 1
        );
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
                <div className="people-involved">
                    <h3>People Involved</h3>
                    <ul>
                        {currentMovie.people.map((person, index) => (
                            <li key={index}>{person}</li>
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
