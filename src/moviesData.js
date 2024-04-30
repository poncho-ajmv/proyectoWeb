const extractYoutubeId = (url) => {
    const regExp =
        /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[1].length === 11 ? match[1] : null;
};



const movies = [
    {
        title: "Star Wars Episode I",
        poster: "https://posters.movieposterdb.com/12_10/1999/120915/l_120915_9275ff24.jpg",
        youtubeLink: "https://www.youtube.com/watch?v=bD7bpG-zDJQ",
        people: ["Liam Neeson", "Ewan McGregor", "Natalie Portman"],
        rating: "6.5",
        saga: "Star Wars",
        category: "Science Fiction"
    },
    {
        title: "Star Wars Episode II",
        poster: "https://posters.movieposterdb.com/12_10/2002/121960/l_121960_2e07c5db.jpg",
        youtubeLink: "https://www.youtube.com/watch?v=gYbW1F_c9eM",
        people: ["Hayden Christensen", "Natalie Portman", "Samuel L. Jackson"],
        rating: "6.6",
        saga: "Star Wars",
        category: "Science Fiction"
    },
    {
        title: "Star Wars Episode III",
        poster: "https://posters.movieposterdb.com/12_10/2005/121924/l_121924_19ed029c.jpg",
        youtubeLink: "https://www.youtube.com/watch?v=5UnjrG_N8hU",
        people: ["Ewan McGregor", "Natalie Portman", "Hayden Christensen"],
        rating: "7.5",
        saga: "Star Wars",
        category: "Science Fiction"
    },
    {
        title: "Star Wars Episode IV",
        poster: "url_poster_4",
        youtubeLink: "https://www.youtube.com/watch?v=1g3_CFmnU7k",
        people: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
        rating: "8.6",
        saga: "Star Wars",
        category: "Science Fiction"
    },
    {
        title: "Star Wars Episode V",
        poster: "url_poster_5",
        youtubeLink: "https://www.youtube.com/watch?v=JNwNXF9Y6kY",
        people: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
        rating: "8.7",
        saga: "Star Wars",
        category: "Science Fiction"
    },
    {
        title: "Star Wars Episode VI",
        poster: "url_poster_6",
        youtubeLink: "https://www.youtube.com/watch?v=5UfA_aKBGMc",
        people: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
        rating: "8.3",
        saga: "Star Wars",
        category: "Science Fiction"
    },
    {
        title: "Star Wars: The Force Awakens",
        poster: "https://posters.movieposterdb.com/12_10/2015/248849/l_248849_590ca20b.jpg",
        youtubeLink: "https://www.youtube.com/watch?v=sGbxmsDFVnE",
        people: ["Daisy Ridley", "John Boyega", "Adam Driver"],
        rating: "7.9",
        saga: "Star Wars",
        category: "Science Fiction"
    },
    {
        title: "Iron Man",
        poster: "https://posters.movieposterdb.com/11_10/2008/0371746/l_0371746_03bb01a7.jpg",
        youtubeLink: "https://www.youtube.com/watch?v=8ugaeA-nMTc",
        people: ["Robert Downey Jr.", "Gwyneth Paltrow", "Jeff Bridges"],
        rating: "7.9",
        saga: "Marvel",
        category: "Super"
    },
    {
        title: "Avengers: Infinity War",
        poster: "https://posters.movieposterdb.com/12_10/2018/4154756/l_4154756_73b7d5f7.jpg",
        youtubeLink: "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
        people: ["Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"],
        rating: "8.4",
        saga: "Marvel",
        category: "Super"
    }
];

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

export { moviesBySagaAndCategory };

export default movies;
