const extractYoutubeId = (url) => {
    const regExp =
        /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
};

const fetchTrailerFromYouTube = async (movieTitle) => {
    const apiKey = "AIzaSyBLupWDOSCsx2RtoMUhMA2HirmJ4jjxgH4";
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        movieTitle + " trailer" // Agregar la palabra clave "tráiler"
    )}&type=video&key=${apiKey}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
        return data.items[0].id.videoId;
    } else {
        return null;
    }
};

const TMDBapiKey = "674684d28cd5c404ad1bf06cd1a5d482";
const getMovieDetails = async (movie) => {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDBapiKey}&query=${encodeURIComponent(
        movie.title
    )}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.results.length > 0) {
        const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${data.results[0].id}?api_key=${TMDBapiKey}&append_to_response=videos,credits,reviews`;
        const detailsResponse = await fetch(movieDetailsUrl);
        const detailsData = await detailsResponse.json();
        movie.poster = detailsData.poster_path
            ? `https://image.tmdb.org/t/p/w500${detailsData.poster_path}`
            : "URL_DEL_POSTER_ALTERNATIVO";
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
        movie.people = movie.cast.map((actor) => actor.name);
        if (movie.youtubeLink) {
            // Si se proporciona un enlace de YouTube, extraer el ID de YouTube del enlace
            movie.youtubeId = extractYoutubeId(movie.youtubeLink);
        } else if (
            detailsData.videos &&
            detailsData.videos.results.length > 0
        ) {
            // Buscar el tráiler en los videos proporcionados por la API de TMDB
            const trailer = detailsData.videos.results.find(
                (video) => video.type === "Trailer"
            );
            if (trailer) {
                // Si se encuentra el tráiler, extraer el ID de YouTube y construir el enlace
                movie.youtubeId = trailer.key;
            }
        }
        if (!movie.youtubeId) {
            // Si no se encontró un tráiler en los videos proporcionados por TMDB o en el enlace proporcionado, buscar en YouTube
            const trailerId = await fetchTrailerFromYouTube(movie.title);
            movie.youtubeId = trailerId;
        }
        if (detailsData.reviews && detailsData.reviews.results.length > 0) {
            movie.review = detailsData.reviews.results[0].content;
        } else {
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
        title: "Star Wars Episode I: The Phantom Menace",
        youtubeLink: "",
        saga: "Star Wars",
        category: "Science Fiction",
    },
    {
        title: "Star Wars Episode II: Attack of the Clones",
        youtubeLink: "",
        saga: "Star Wars",
        category: "Science Fiction",
    },
    {
        title: "Star Wars Episode III: Revenge of the Sith",
        youtubeLink: "",
        saga: "Star Wars",
        category: "Science Fiction",
    },
    {
        title: "Star Wars Episode IV: A New Hope",
        youtubeLink: "",
        saga: "Star Wars",
        category: "Science Fiction",
    },
    {
        title: "Star Wars Episode V: The Empire Strikes Back",
        youtubeLink: "",
        saga: "Star Wars",
        category: "Science Fiction",
    },
    {
        title: "Star Wars Episode VI: Return of the Jedi",
        youtubeLink: "",
        saga: "Star Wars",
        category: "Science Fiction",
    },
    {
        title: "Star Wars Episode VII: The Force Awakens",
        youtubeLink: "",
        saga: "Star Wars",
        category: "Science Fiction",
    },
    {
        title: "Star Wars Episode VIII: The Last Jedi",
        youtubeLink: "",
        saga: "Star Wars",
        category: "Science Fiction",
    },
    {
        title: "Star Wars Episode IX: The Rise of Skywalker",
        youtubeLink: "",
        saga: "Star Wars",
        category: "Science Fiction",
    },
    {
        title: "Rogue One: A Star Wars Story",
        youtubeLink: "",
        saga: "Star Wars",
        category: "Science Fiction",
    },
    {
        title: "Harry Potter and the Sorcerer's Stone",
        youtubeLink: "",
        saga: "Harry Potter",
        category: "Fantasy",
    },
    {
        title: "Harry Potter and the Chamber of Secrets",
        youtubeLink: "",
        saga: "Harry Potter",
        category: "Fantasy",
    },
    {
        title: "Harry Potter and the Prisoner of Azkaban",
        youtubeLink: "",
        saga: "Harry Potter",
        category: "Fantasy",
    },
    {
        title: "Harry Potter and the Goblet of Fire",
        youtubeLink: "",
        saga: "Harry Potter",
        category: "Fantasy",
    },
    {
        title: "Harry Potter and the Order of the Phoenix",
        youtubeLink: "",
        saga: "Harry Potter",
        category: "Fantasy",
    },
    {
        title: "Harry Potter and the Half-Blood Prince",
        youtubeLink: "",
        saga: "Harry Potter",
        category: "Fantasy",
    },
    {
        title: "Harry Potter and the Deathly Hallows - Part 1",
        youtubeLink: "",
        saga: "Harry Potter",
        category: "Fantasy",
    },
    {
        title: "Harry Potter and the Deathly Hallows - Part 2",
        youtubeLink: "",
        saga: "Harry Potter",
        category: "Fantasy",
    },
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        youtubeLink: "",
        saga: "The Lord of the Rings",
        category: "Fantasy",
    },
    {
        title: "The Lord of the Rings: The Two Towers",
        youtubeLink: "https://www.youtube.com/watch?v=LbfMDwc4azU",
        saga: "The Lord of the Rings",
        category: "Fantasy",
    },
    {
        title: "The Lord of the Rings: The Return of the King",
        youtubeLink: "",
        saga: "The Lord of the Rings",
        category: "Fantasy",
    },

    {
        title: "Iron Man",
        youtubeLink: "",
        saga: "Marvel",
        category: "Super",
    },

    {
        title: "The Hunger Games",
        youtubeLink: "https://www.youtube.com/watch?v=PbA63a7H0bo",
        saga: "The Hunger Games",
        category: "Adventure",
    },
    {
        title: "The Hunger Games: Catching Fire",
        youtubeLink: "",
        saga: "The Hunger Games",
        category: "Adventure",
    },
    {
        title: "The Hunger Games: Mockingjay - Part 1",
        youtubeLink: "",
        saga: "The Hunger Games",
        category: "Adventure",
    },
    {
        title: "The Hunger Games: Mockingjay - Part 2",
        youtubeLink: "",
        saga: "The Hunger Games",
        category: "Adventure",
    },

    {
        title: "Jurassic Park",
        youtubeLink: "",
        saga: "Jurassic Park",
        category: "Adventure",
    },
    {
        title: "The Lost World: Jurassic Park",
        youtubeLink: "",
        saga: "Jurassic Park",
        category: "Adventure",
    },
    {
        title: "Jurassic Park III",
        youtubeLink: "",
        saga: "Jurassic Park",
        category: "Adventure",
    },
    {
        title: "Jurassic World",
        youtubeLink: "",
        saga: "Jurassic Park",
        category: "Adventure",
    },
    {
        title: "Jurassic World: Fallen Kingdom",
        youtubeLink: "",
        saga: "Jurassic Park",
        category: "Adventure",
    },
    {
        title: "Jurassic World: Dominion",
        youtubeLink: "",
        saga: "Jurassic Park",
        category: "Adventure",
    },

    {
        title: "Raiders of the Lost Ark",
        youtubeLink: "",
        saga: "Indiana Jones",
        category: "Adventure",
    },
    {
        title: "Indiana Jones and the Temple of Doom",
        youtubeLink: "",
        saga: "Indiana Jones",
        category: "Adventure",
    },
    {
        title: "Indiana Jones and the Last Crusade",
        youtubeLink: "",
        saga: "Indiana Jones",
        category: "Adventure",
    },
    {
        title: "Indiana Jones and the Kingdom of the Crystal Skull",
        youtubeLink: "",
        saga: "Indiana Jones",
        category: "Adventure",
    },
    {
        title: "Pirates of the Caribbean: The Curse of the Black Pearl",
        youtubeLink: "",
        saga: "Pirates of the Caribbean",
        category: "Adventure",
    },
    {
        title: "Pirates of the Caribbean: Dead Man's Chest",
        youtubeLink: "",
        saga: "Pirates of the Caribbean",
        category: "Adventure",
    },
    {
        title: "Pirates of the Caribbean: At World's End",
        youtubeLink: "",
        saga: "Pirates of the Caribbean",
        category: "Adventure",
    },
    {
        title: "Pirates of the Caribbean: On Stranger Tides",
        youtubeLink: "",
        saga: "Pirates of the Caribbean",
        category: "Adventure",
    },
    {
        title: "Pirates of the Caribbean: Dead Men Tell No Tales",
        youtubeLink: "",
        saga: "Pirates of the Caribbean",
        category: "Adventure",
    },
    {
        title: "The Matrix",
        youtubeLink: "",
        saga: "The Matrix",
        category: "Action",
    },
    {
        title: "The Matrix Reloaded",
        youtubeLink: "",
        saga: "The Matrix",
        category: "Action",
    },
    {
        title: "The Matrix Revolutions",
        youtubeLink: "",
        saga: "The Matrix",
        category: "Action",
    },
    {
        title: "The Fast and the Furious",
        youtubeLink: "",
        saga: "Fast & Furious",
        category: "Action",
    },
    {
        title: "2 Fast 2 Furious",
        youtubeLink: "",
        saga: "Fast & Furious",
        category: "Action",
    },
    {
        title: "The Fast and the Furious: Tokyo Drift",
        youtubeLink: "",
        saga: "Fast & Furious",
        category: "Action",
    },
    {
        title: "Fast & Furious",
        youtubeLink: "",
        saga: "Fast & Furious",
        category: "Action",
    },
    {
        title: "Fast Five",
        youtubeLink: "",
        saga: "Fast & Furious",
        category: "Action",
    },
    {
        title: "Fast & Furious 6",
        youtubeLink: "",
        saga: "Fast & Furious",
        category: "Action",
    },
    {
        title: "Furious 7",
        youtubeLink: "",
        saga: "Fast & Furious",
        category: "Action",
    },
    {
        title: "The Fate of the Furious",
        youtubeLink: "",
        saga: "Fast & Furious",
        category: "Action",
    },
    {
        title: "F9: The Fast Saga",
        youtubeLink: "",
        saga: "Fast & Furious",
        category: "Action",
    },
    {
        title: "FAST & FURIOUS X",
        youtubeLink: "",
        saga: "Fast & Furious",
        category: "Action",
    },

    {
        title: "Mission: Impossible",
        youtubeLink: "",
        saga: "Mission: Impossible",
        category: "Action",
    },
    {
        title: "Mission: Impossible 2",
        youtubeLink: "",
        saga: "Mission: Impossible",
        category: "Action",
    },
    {
        title: "Mission: Impossible III",
        youtubeLink: "",
        saga: "Mission: Impossible",
        category: "Action",
    },
    {
        title: "Mission: Impossible - Ghost Protocol",
        youtubeLink: "",
        saga: "Mission: Impossible",
        category: "Action",
    },
    {
        title: "Mission: Impossible - Rogue Nation",
        youtubeLink: "",
        saga: "Mission: Impossible",
        category: "Action",
    },
    {
        title: "Mission: Impossible - Fallout",
        youtubeLink: "",
        saga: "Mission: Impossible",
        category: "Action",
    },
    {
        title: "Dr. No",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "From Russia with Love",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "Goldfinger",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "Thunderball",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "You Only Live Twice",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "On Her Majesty's Secret Service",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "Diamonds Are Forever",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "Live and Let Die",
        youtubeLink: "https://www.youtube.com/watch?v=KTzsm9-XWQo",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "The Man with the Golden Gun",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "The Spy Who Loved Me",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "Moonraker",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "For Your Eyes Only",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "Octopussy",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "A View to a Kill",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "The Living Daylights",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "Licence to Kill",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "GoldenEye",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "Tomorrow Never Dies",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "The World Is Not Enough",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "Die Another Day",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "Casino Royale",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "Quantum of Solace",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "Skyfall",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "Spectre",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "No Time to Die",
        youtubeLink: "",
        saga: "James Bond",
        category: "Thriller",
    },
    {
        title: "Iron Man",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "The Incredible Hulk",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Iron Man 2",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Thor",
        youtubeLink: "",
        saga: "Marvel",
        category: "Fantasy",
    },
    {
        title: "Captain America: The First Avenger",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "The Avengers",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Iron Man 3",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Thor: The Dark World",
        youtubeLink: "",
        saga: "Marvel",
        category: "Fantasy",
    },
    {
        title: "Captain America: The Winter Soldier",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Guardians of the Galaxy",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Avengers: Age of Ultron",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Ant-Man",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Captain America: Civil War",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Doctor Strange",
        youtubeLink: "",
        saga: "Marvel",
        category: "Fantasy",
    },
    {
        title: "Guardians of the Galaxy Vol. 2",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Spider-Man: Homecoming",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Thor: Ragnarok",
        youtubeLink: "",
        saga: "Marvel",
        category: "Fantasy",
    },
    {
        title: "Black Panther",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Avengers: Infinity War",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Ant-Man and The Wasp",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Captain Marvel",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Avengers: Endgame",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Spider-Man: Far From Home",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Black Widow",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Shang-Chi and the Legend of the Ten Rings",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Eternals",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Spider-Man: No Way Home",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Batman Begins",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "The Dark Knight",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "The Dark Knight Rises",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Man of Steel",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Wonder Woman",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Aquaman",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Suicide Squad",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Justice League",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Shazam!",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Birds of Prey",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "The Suicide Squad",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Batman",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Batman Returns",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Batman Forever",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Batman & Robin",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Batman Begins",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "The Dark Knight",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "The Dark Knight Rises",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Superman",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Superman II",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Superman III",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Superman IV: The Quest for Peace",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Superman Returns",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "Man of Steel",
        youtubeLink: "",
        saga: "DC",
        category: "Action",
    },
    {
        title: "X-Men ",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "X2: X-Men United",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "X-Men: The Last Stand",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "X-Men Origins: Wolverine",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "X-Men: First Class",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "The Wolverine",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "X-Men: Days of Future Past",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Deadpool",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "X-Men: Apocalypse",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Logan",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "Deadpool 2",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },
    {
        title: "X-Men: Dark Phoenix",
        youtubeLink: "",
        saga: "Marvel",
        category: "Action",
    },

    {
        title: "The Hangover",
        youtubeLink: "",
        saga: "Comedy",
        category: "Comedy",
    },
];

const fetchMovieDetails = async () => {
    for (const movie of movies) {
        await getMovieDetails(movie);
    }
};

fetchMovieDetails();

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

export { movies, moviesBySagaAndCategory };

export default movies;
