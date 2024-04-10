import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchAllMovies, fetchMovieByNameAndGenre } from '../../api';
import MovieItem from '../../components/MovieItem';
import Navbar from '../../components/Navbar';
import NavbarSearch from '../../components/NavbarSearch';
import "../../styles/Home.css"
import "../../styles/Movielist.css"
import "../../styles/Sidebar.css"



function Home() {
    const allGenres = ["Biography", "Crime", "Drama", "Action", "Romance", "History", "Adventure", "Fantasy", "Thriller", " Animation", " Comedy", " Documentary", " Family", " Horror ",
        "Music", " Mystery", " Science Fiction ", "War ", "Western"]



    const [movies, setMovies] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [allMoviesBasedOnGenres, setAllMoviesBasedOnGenres] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [err,setErr]=useState(null);

    const navigate = useNavigate();


    const handleGenreClick = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre))
        }
        else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    }
    const handleMovieItemClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    }



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const allMovies = await fetchAllMovies();
                setMovies(allMovies.data);

            } catch (error) {
                console.log(error.message);
                setErr(error.message)
            }
            setLoading(false);
        };
        fetchData();
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const moviesByGenres = await fetchMovieByNameAndGenre('', selectedGenres.join(','));
                setAllMoviesBasedOnGenres(moviesByGenres.data);
            } catch (error) {
                console.log(error.message);
            setError(error.message);
            }
            setLoading(false);
        };
        fetchData();
    }, [selectedGenres]);

    return (


        <div className="page-container">
            <div className="page-left-container">
                {loading && <p>Loading...</p>}
                {err && <p>Error: {err}</p>}
                {!loading && !err &&
                <div className="movielist-container">

                    {allMoviesBasedOnGenres.length == 0 ? "No Movies Available " : allMoviesBasedOnGenres.map((movie) => (
                        <MovieItem key={movie._id} movie={movie} onItemClick={handleMovieItemClick} />

                    ))}
                </div>
                }
            </div>
            <div className="page-right-container">
                <div className="sidebar-container">
                    <ul className="sidebar-ul">
                        <li className="sidebar-li sidebar-li-title">Genres</li>
                        {allGenres.map((genre) => (
                            <li className='sidebar-li' key={genre}>
                                <input
                                    checked={selectedGenres.includes(genre)}
                                    type='checkbox'
                                    onChange={() => handleGenreClick(genre)}

                                />
                                <label>{genre}</label>
                                <br />


                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>



    )
}

export default Home
