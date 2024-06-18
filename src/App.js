import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MovieCarousel from "./MovieCarousel"; 
import Footer from "./Footer";
import StarRating from './StarRating';

/*CSS*/
import "./MovieList.css";
import "./MovieDetail.css";
import "./Logocss.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "674684d28cd5c404ad1bf06cd1a5d482";
const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
const URL_IMAGE = "https://image.tmdb.org/t/p/original";

function App() {
    const [movies, setMovies] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [trailer, setTrailer] = useState(null);
    const [movie, setMovie] = useState({ title: "Loading Movies" });
    const [playing, setPlaying] = useState(false);
    const [cast, setCast] = useState([]);
    const [directors, setDirectors] = useState([]); // Nuevo estado para los directores
    const [category, setCategory] = useState("");
    const [searchType, setSearchType] = useState("");
    const [zoomLevel, setZoomLevel] = useState(window.devicePixelRatio);

    useEffect(() => {
        const handleResize = () => {
            setZoomLevel(window.devicePixelRatio);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const fetchMovies = async (
        searchKey,
        category,
        searchType,
        fromDate,
        toDate
    ) => {
        const type = searchKey ? "search" : "discover";
        let params = {
            api_key: API_KEY,
            query: searchKey,
            with_genres: category ? category : undefined,
        };

        if (searchType) {
            params = { ...params, ...{ sort_by: searchType } };
        }

        if (fromDate && toDate) {
            params["primary_release_date.gte"] = fromDate;
            params["primary_release_date.lte"] = toDate;
        }

        const {
            data: { results },
        } = await axios.get(`${API_URL}/${type}/movie`, {
            params: params,
        });

        const filteredMovies = results.filter(
            (movie) =>
                !movie.title.toLowerCase().includes("tiburon") &&
                movie.title !== "No Way Up" &&
                movie.title !== "Jaws" &&
                movie.title !== "Sharknado" &&
                movie.title !== "Deep Blue Sea" &&
                movie.title !== "The Meg" &&
                movie.title !== "Under Paris" &&
                movie.title !== "Shark"
        );

        setMovies(filteredMovies);
        setMovie(filteredMovies[0]);

        if (filteredMovies.length) {
            await fetchMovie(filteredMovies[0].id);
        }
    };

    const fetchMovie = async (id) => {
        const { data } = await axios.get(`${API_URL}/movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos,credits",
            },
        });

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(
                (vid) => vid.name === "Official Trailer"
            );
            setTrailer(trailer ? trailer : data.videos.results[0]);
        }
        setMovie(data);
        if (data.credits && data.credits.cast) {
            setCast(data.credits.cast);
            setDirectors(data.credits.crew.filter(person => person.job === "Director")); // Filtra los directores y actualiza el estado
        }
    };

    const selectMovie = async (movie) => {
        fetchMovie(movie.id);
        setMovie(movie);
        window.scrollTo(0, 0);
    };

    const searchMovies = (e) => {
        e.preventDefault();
        fetchMovies(searchKey, category, searchType);
    };

    const goToHomePage = () => {
        window.location.href = "/";
    };

    const handleCategoryChange = (category) => {
        setCategory(category);
        setSearchType(""); // Resetear el tipo de búsqueda al seleccionar una categoría
        fetchMovies(searchKey, category, searchType);
    };

    useEffect(() => {
        // eslint-disable-next-line
        fetchMovies("", "", ""); // eslint-disable-next-line
    }, []);

    const fetchPopularMovies = async () => {
        setSearchType("popularity.desc"); // Establecer el tipo de búsqueda como más popular
        fetchMovies(searchKey, category, "popularity.desc");
    };

    const fetchRecentMovies = async () => {
        const currentDate = new Date();
        const fromDate = new Date(currentDate);
        const toDate = new Date(currentDate);

        fromDate.setMonth(currentDate.getMonth() - 1);
        toDate.setMonth(currentDate.getMonth() + 1);

        const fromDateString = fromDate.toISOString().split("T")[0];
        const toDateString = toDate.toISOString().split("T")[0];

        setSearchType("release_date.desc");

        fetchMovies(
            searchKey,
            category,
            `release_date.desc`,
            fromDateString,
            toDateString
        );
    };

    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (movie) => {
        if (favorites.find(fav => fav.id === movie.id)) {
            setFavorites(favorites.filter(fav => fav.id !== movie.id));
        } else {
            setFavorites([...favorites, movie]);
        }
    };

    <button
    className={`favorite-button ${favorites.find(fav => fav.id === movie.id) ? 'favorited' : ''}`}
    onClick={() => toggleFavorite(movie)}
>
    {favorites.find(fav => fav.id === movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
</button>



const renderFavorites = () => (
    <div className="favorites-section">
        <h1>Favorites</h1>
        <div className="container_movies">
            <div className="row_movies">
                {favorites.map((movie) => (
                    <div
                        key={movie.id}
                        className="col_movies"
                        onClick={() => selectMovie(movie)}
                    >
                        <img src={`${URL_IMAGE + movie.poster_path}`} alt={movie.title} />
                        <h4>{movie.title}</h4>
                        <p>Rating: {movie.vote_average}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);


    

    const fetchTopRatedMovies = async () => {
        setSearchType("vote_average.desc"); // Establecer el tipo de búsqueda como mejor rating
        fetchMovies(searchKey, category, "vote_average.desc");
    };

    const fetchTopRatedMoviesAll = async () => {
        setSearchType("top_rated");
        const {
            data: { results },
        } = await axios.get(`${API_URL}/movie/top_rated`, {
            params: {
                api_key: API_KEY,
            },
        });

        setMovies(results);
        setMovie(results[0]);
        if (results.length) {
            await fetchMovie(results[0].id);
        }
    };

    const categories = {
        28: "Action",
        35: "Comedy",
        18: "Drama",
        27: "Horror",
        10749: "Romance",
        878: "Science Fiction",
        10751: "Family",
        16: "Animation",
        80: "Crime",
        37: "Western",
        36: "History",
        14: "Fantasy",
        53: "Thriller",
        10752: "War",
        12: "Adventure",
        99: "Documentary",
        10402: "Music",
        10770: "TV Movie",
        9648: "Mystery",
    };

    return (
        <div className="App" style={{ zoom: zoomLevel }}>
            <header className="menu">
                <div className="logo-and-search">
                    <button className="logo" onClick={goToHomePage}>
                        <img src="http://imgfz.com/i/5hQ3ZSJ.png" alt="Logo" />
                    </button>
                    <button className="filter-button" onClick={fetchTopRatedMoviesAll}>All time</button>
                </div>
                <form className="search-container" onSubmit={searchMovies}>
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        onChange={(e) => setSearchKey(e.target.value)}
                    />
                    <button className="search-button" onClick={searchMovies}>
                        Search
                    </button>
                </form>
                <div className="category-buttons">
                    <select
                        value={category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                        <option value="" className="category-but">All</option>
                        {Object.entries(categories).map(([id, name]) => (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <button className="filter-button" onClick={fetchPopularMovies}>Popular</button>
                    <button className="filter-button" onClick={fetchRecentMovies}>Recent</button>
                    <button className="filter-button" onClick={fetchTopRatedMovies}>Top Rated</button>
                </div>
            </header>
            <div>
                <MovieCarousel movies={movies} selectMovie={selectMovie} />
                <main>
                    {movie ? (
                        <div
                            className="viewtrailer"
                            style={{
                                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <StarRating rating={movie.vote_average} />
                            {trailer && (
                                <div className="trailer-container">
                                    <img
                                        src={`${IMAGE_PATH}${movie.poster_path}`}
                                        alt={movie.title}
                                        className="movie-poster"
                                        width="510"
                                        height="815"
                                    />
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${trailer.key}`}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                            <button
    className={`favorite-button ${favorites.find(fav => fav.id === movie.id) ? 'favorited' : ''}`}
    onClick={() => toggleFavorite(movie)}
>
    {favorites.find(fav => fav.id === movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
</button>

                            <div className="cast-container">
                                <h2>Directors</h2>
                                <ul>
                                    {directors.map((director) => (
                                        <li key={director.id}>{director.name}</li>
                                    ))}
                                </ul>
                                <h2>Cast</h2>
                                <ul>
                                    {cast
                                        .filter(actor => actor.order <= 10)
                                        .map((actor) => (
                                            <li key={actor.id}>
                                                {actor.character} - {actor.name}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            {playing ? (
                                <button
                                    onClick={() => setPlaying(false)}
                                    className="boton"
                                >
                                    Close
                                </button>
                            ) : (
                                <div className="container">
                                    <div>
                                        <h1 className="text-white">
                                            {movie.title}
                                        </h1>
                                        <p className="text-white">
                                            {movie.overview}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : null}
                </main>
            </div>
            
            <div className="container_movies">
                <div className="row_movies">
                    {movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="col_movies"
                            onClick={() => selectMovie(movie)}
                        >
                            <img src={`${URL_IMAGE + movie.poster_path}`} alt={movie.title} />
                            <h4>{movie.title}</h4>
                            <p>Rating: {movie.vote_average}</p>
                        </div>
                    ))}
                </div>
                {renderFavorites()}
            </div>
            <Footer />
        </div>
    );
    
}

export default App;
