import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchMovieByNameAndGenre, fetchTheaterByName } from '../api';
import "../styles/NavbarSearch.css";

function NavbarSearch({ OnBackClick }) {
    const [isMovieSearchSelected, setIsMovieSearchSelected] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [nameSearchValid, setNameSearchValid] = useState(true);
    const [theaters, setTheaters] = useState([]);
    const [movies, setMovies] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();

    const handleMovieSearch = async () => {
        try {
            const response = await fetchMovieByNameAndGenre(searchTerm, '');
            const movieByName = response.data;
            if (movieByName.length === 0) {
                setNameSearchValid(false);
            } else {
                setMovies(movieByName);
            }
        } catch (error) {
            console.log(error.message)
            setNameSearchValid(false);
        }
    }

    const handleTheaterSearch = async () => {
        if (searchTerm === '') return;
        try {
            const response = await fetchTheaterByName(searchTerm);
            if (response.data.length > 0) {
                setTheaters(response.data);
            } else {
                setNameSearchValid(false);
            }
        } catch (error) {
            setNameSearchValid(false);
            console.log(error);
        }
    };

    const handleTheaterSelection = (theaterId) => {
        console.log("theater selected", theaterId);
        navigate(`/theater/${theaterId}`);
        OnBackClick(false)
    };

    const handleMovieSelection = (movieId) => {
        console.log("movie selected", movieId);
        navigate(`/movie/${movieId}`);
        OnBackClick(false)
    }

    useEffect(() => {
        if (isMovieSearchSelected) {
            handleMovieSearch();
        } else {
            handleTheaterSearch();
        }
    }, [searchTerm])


    return (
        <div className='navsearch-main-container'
        >

            <div className='search-exit'>
                <button onClick={() => OnBackClick(false)}>go back</button>
                <input
                    className='search' type='text'
                    placeholder='Search For Movies, Theaters...'
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                    onFocus={() => setShowOptions(true)}
                />
            </div>

            {showOptions && searchTerm != "" && (
                <div className='search-results'>
                    {isMovieSearchSelected ? (
                        <div className='search-option-list' onFocus={() => setShowOptions(true)}>
                            {movies.map((movie) => (
                               
                                <div className='search-option-list-item' key={movie._id} onClick={() => handleMovieSelection(movie._id)}>
                                    {movie.title}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='search-option-list'>
                            {theaters.map(theater => (
                                
                                <div className='search-option-list-item' key={theater._id} onClick={() => handleTheaterSelection(theater._id)}>
                                    {theater.name} - {theater.location}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            <div className='search-options-button'>
                <button className={isMovieSearchSelected ? 'selected' : ''} onClick={() => {
                    if (!isMovieSearchSelected) {
                        setSearchTerm("");
                        setIsMovieSearchSelected(true);
                    }
                }}>Movies</button>
                <button className={!isMovieSearchSelected ? 'selected' : ''} onClick={() => {
                    if (isMovieSearchSelected) {
                        setSearchTerm("");
                        setIsMovieSearchSelected(false);
                    }
                }}>Theaters</button>
            </div>
        </div>
    )
}

export default NavbarSearch;
