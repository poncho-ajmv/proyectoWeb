import React from 'react';
import './StarRating.css';

const StarRating = ({ rating }) => {
    const maxStars = 4;
    const scaledRating = (rating / 2); // Escala de 10 a 5

    const fullStars = Math.floor(scaledRating);  // Número de estrellas llenas
    const halfStar = scaledRating % 1 >= 0.5;    // Indica si debe haber media estrella

    const stars = [];

    for (let i = 1; i <= maxStars; i++) {  // Iterar desde 1 hasta 5
        if (i <= fullStars ) {
            stars.push(<span key={i} className="star">&#9733;</span>); // Estrella llena
        } else if (i === fullStars + 1 && halfStar) {
            stars.push(<span key={i} className="star">&#9733;&#9734;</span>); // Media estrella
        } else {
            stars.push(<span key={i} className="star">&#9734;</span>); // Estrella vacía
        }
    }

    return <div className="star-rating">{stars}</div>;
};

export default StarRating;
