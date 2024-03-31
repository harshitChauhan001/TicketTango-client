import React, { useEffect, useState } from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'
import { fetchAllMoviesForTheater, fetchAllShowTimeOfTheater, fetchAllShowTimeOfTheaterForMoive, fetchTheaterById } from '../../api';
import NotFound from '../NotFound/NotFound';
import BadRequest from '../../components/BadRequest';
import MovieItem from '../../components/MovieItem';
import ShowTimeItem from '../../components/ShowTimeItem';
import Navbar from '../../components/Navbar';
import NavbarSearch from '../../components/NavbarSearch';
import "../../styles/Theater.css"


function Theater() {
    const location = useLocation();
    const { id: theaterId } = useParams();
    const [err, setErr] = useState("");
    const [theaterDetails, setTheaterDetails] = useState({});
    const [shows, setShows] = useState([]);
    const [movies, setMovies] = useState([]);
    const [movieShows, setMovieShows] = useState([]);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchTheaterById(theaterId);
                const allShows = await fetchAllShowTimeOfTheater(theaterId);
                const allMovies = await fetchAllMoviesForTheater(theaterId);
                console.log(allMovies)
                const allMoviesWithShows = await Promise.all((allMovies.data).map(async (movie) => {
                    const showsForMovie = await fetchAllShowTimeOfTheaterForMoive(theaterId, movie._id);
                    return { movie, showsForMovie };
                }))
                console.log(allMoviesWithShows);
                setTheaterDetails(response.data);

                setMovies(allMoviesWithShows)

            } catch (error) {

                console.log(error.message);
                setErr("Not Found");

            }
        }
        fetchData();
    }, [theaterId])



    if (err === "Not Found") {
        return <NotFound />
    }


    return (

        <div className='theater-page-container'>
            <div className='theater-details'>
                <div className='theater-name-location'>

                    <h1 className='theater-name'>{theaterDetails.name}</h1>
                    <h3 className='location'><strong>Location:</strong> {theaterDetails.location}</h3>
                </div>
                <div className='theater-info'>

                    <p><strong>Capacity:</strong> {theaterDetails.capacity}</p>
                    <p><strong>Address:</strong> {theaterDetails.address}</p>
                </div>
            </div>


            <div className='theater-movies-details'>
                <h2>Current Screenings: </h2>
                <div className='theater-movie-items'>

                    {movies.map(({ movie, showsForMovie }) => (
                        <div className='movie-details'>
                            <div className='movie-name-container' onClick={() => handleMovieClick(movie._id)}>
                                <div className='movie-name'>{movie.title}</div>

                            </div>
                            <div className='showTime-list'>
                                {showsForMovie.data.map((show) => (
                                    <Link to={`/showTime/${show._id}`}>
                                        <ShowTimeItem key={show._id} show={show} />

                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>

    )
}

export default Theater