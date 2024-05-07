import React, { useState } from "react";
import { moviesBySagaAndCategory } from "./moviesData";


function MovieDetails() {
    const [selectedSaga, setSelectedSaga] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleSagaChange = (event) => {
        setSelectedSaga(event.target.value);
        setSelectedCategory(""); // Reset category when saga changes
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
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
                .flatMap((saga) => Object.values(saga[selectedCategory] || {}))
                .flat();
        }
        return [];
    };

    // Obtener todas las sagas disponibles
    const allSagas = Object.keys(moviesBySagaAndCategory);

    // Obtener todas las categorías disponibles
    const allCategories = Object.values(moviesBySagaAndCategory)
        .flatMap((saga) => Object.keys(saga))
        .filter((category, index, self) => self.indexOf(category) === index);


        
    return (
        <div className="movie-details">
            <div className="selectors">
                <div>
                    <label htmlFor="sagas">Saga:</label>
                    <select
                        id="sagas"
                        onChange={handleSagaChange}
                        value={selectedSaga}
                    >
                        <option value="">All Sagas</option>
                        {allSagas.map((saga) => (
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
                        value={selectedCategory}
                    >
                        <option value="">All Categories</option>
                        {allCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="poster-list">
                {getFilteredMovies().map((movie) => (
                    <img
                        key={movie.title}
                        src={movie.poster}
                        alt={movie.title}
                    />
                ))}
                </div>
            </div>


            
            
        </div>
    );
}

export default MovieDetails;
