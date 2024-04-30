//moviesData.js

const extractYoutubeId = (url) => {
    const regExp =
        /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
};

const TMDBapiKey = "674684d28cd5c404ad1bf06cd1a5d482"; //https://www.themoviedb.org/settings/api

const getMovieDetails = async (movie) => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDBapiKey}&query=${encodeURIComponent(
        movie.title
    )}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.results.length > 0) {
        const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${data.results[0].id}?api_key=${TMDBapiKey}&append_to_response=credits,reviews`;
        const detailsResponse = await fetch(movieDetailsUrl);
        const detailsData = await detailsResponse.json();
        movie.poster = `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
        movie.rating = detailsData.vote_average;
        movie.cast = detailsData.credits.cast
            .filter(
                (actor) =>
                    actor.known_for_department === "Directing" ||
                    actor.order <= 2
            )
            .map((actor) => ({
                name: actor.name,
                character: actor.character,
            }));
        movie.people = movie.cast.map((actor) => actor.name); // Extracting people involved
        // Assuming reviews are available and you want to take the first review
        if (detailsData.reviews && detailsData.reviews.results.length > 0) {
            movie.review = detailsData.reviews.results[0].content;
        } else {
            // Fetching review dynamically based on movie title
            const reviewUrl = `https://api.example.com/reviews?title=${encodeURIComponent(
                movie.title
            )}`;
            const reviewResponse = await fetch(reviewUrl);
            const reviewData = await reviewResponse.json();
            if (reviewData.length > 0) {
                movie.review = reviewData[0].review;
            } else {
                movie.review = "No hay reseñas disponibles.";
            }
        }
    } else {
        console.log(
            `No se encontraron detalles para la película ${movie.title}`
        );
    }
};

const movies = [
    {
        title: "Star Wars Episode I",
        youtubeLink: "https://www.youtube.com/watch?v=bD7bpG-zDJQ",
        saga: "Star Wars",
        category: "Science Fiction",
    },
    {
        title: "Avengers: Infinity War",
        youtubeLink: "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
        saga: "Marvel",
        category: "Super",
    },
];

// Obtener detalles de las películas
const fetchMovieDetails = async () => {
    for (const movie of movies) {
        await getMovieDetails(movie);
    }
};

// Agrupar películas por saga y categoría
const moviesBySagaAndCategory = movies.reduce((acc, movie) => {
    const { saga, category } = movie;
    if (!acc[saga]) {
        acc[saga] = {};
    }
    if (!acc[saga][category]) {
        acc[saga][category] = [];
    }
    acc[saga][category].push(movie);
    return acc;
}, {});

movies.forEach((movie) => {
    movie.youtubeId = extractYoutubeId(movie.youtubeLink);
});

// Ejecutar la función para obtener los detalles de las películas
fetchMovieDetails();

export { moviesBySagaAndCategory };

export default movies;
