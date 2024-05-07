import React, { useState } from "react";
import { moviesBySagaAndCategory } from "./moviesData";

function MovieDetails() {
    const [selectedSaga, setSelectedSaga] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSagaChange = (event) => {
        setSelectedSaga(event.target.value);
        setSelectedCategory(null); // Reset category when saga changes
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setSelectedSaga(null); // Reset saga when category changes
    };

    const getFilteredMovies = () => {
        if (selectedSaga && selectedCategory) {
            return (
                moviesBySagaAndCategory[selectedSaga]?.[selectedCategory] || []
            );
        } else if (selectedSaga) {
            return Object.values(
                moviesBySagaAndCategory[selectedSaga] || {}
            ).flat();
        } else if (selectedCategory) {
            return Object.values(moviesBySagaAndCategory)
                .map((category) => category[selectedCategory])
                .filter(Boolean)
                .flat();
        }
        return [];
    };

    return (
        <div className="movie-details">
            <h2>Movie Details</h2>
            <div>
                <label htmlFor="sagas">Saga:</label>
                <select
                    id="sagas"
                    onChange={handleSagaChange}
                    value={selectedSaga || ""}
                >
                    <option value="">All Sagas</option>
                    {Object.keys(moviesBySagaAndCategory).map((saga) => (
                        <option key={saga} value={saga}>
                            {saga}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="categories">Category:</label>
                <select
                    id="categories"
                    onChange={handleCategoryChange}
                    value={selectedCategory || ""}
                >
                    <option value="">All Categories</option>
                    {Object.keys(
                        moviesBySagaAndCategory[selectedSaga] || {}
                    ).map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="movies-list">
                {getFilteredMovies().map((movie) => (
                    <div key={movie.title} className="movie-item">
                        <h3>{movie.title}</h3>
                        <img src={movie.poster} alt={movie.title} />
                        <p>Rating: {movie.rating}</p>
                        <p>Description: {movie.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieDetails;
