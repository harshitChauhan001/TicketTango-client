import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { fetchMovieById } from '../../api';
import NotFound from '../NotFound/NotFound';
import BadRequest from '../../components/BadRequest';
import Navbar from '../../components/Navbar';
import NavbarSearch from '../../components/NavbarSearch';
import { fetchTheatersByMovie } from '../../api';

import defaultPoster from "../../assets/Padmaavat.jpg";
import Brahmastra from "../../assets/Brahmastra.jpg";
import Pathaan from "../../assets/Pathaan.jpg";
import Padmaavat from "../../assets/Padmaavat.jpg";
import RRR from "../../assets/RRR.jpg";
import Yodha from "../../assets/Yodha.jpg";
import GangubaiKathiawadi from "../../assets/GangubaiKathiawadi.jpg";
import Kgf from "../../assets/K.G.F.Chapter2.jpg";
import RadheShyam from "../../assets/RadheShyam.jpg"

import "../../styles/Movie.css"
import "../../styles/TheaterList.css"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";



function Movie() {
  const location = useLocation();
  const movieId = location.pathname.split('/')[2];
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const [showTheatersButtonClicked, setShowTheatersButtonClicked] = useState(false);
  const [theaters, setTheaters] = useState(null);



  const getPosterPath = (title) => {
    try {
      return require(`../../assets/${title}.jpg`).default;
    } catch (error) {
      return defaultPoster;
    }
  };
  const handleShowTheaters = async () => {
    const savedLocation = localStorage.getItem('userLocation');
    if (!savedLocation) {
      alert('Please enter your location in the navbar first.');
      return;
    }

    try {
      const response = await fetchTheatersByMovie(movieId, savedLocation);
      console.log(response.data);
      const theaters = response.data;
      if (theaters.length === 0) {
        alert('No theaters found showing this movie in your location.');
      } else {
        
        setShowTheatersButtonClicked(true);
        setTheaters(response.data);
        theaters.forEach(theater => console.log(theater.name));
      }
    } catch (error) {
      console.error('Error fetching theaters:', error);
      alert('An error occurred while fetching theaters.');
    }
  };
  const getPosterImage = (title) => {
    switch (title) {
      case 'Brahmastra':
        return Brahmastra;
      case 'Pathaan':
        return Pathaan;
      case 'Padmaavat':
        return Padmaavat;
      case 'RRR':
        return RRR;
      case 'Yodha':
        return Yodha;
      case 'Gangubai Kathiawadi':
        return GangubaiKathiawadi;
      case 'K.G.F. Chapter2':
        return Kgf;
      case 'Radhe Shyam':
        return RadheShyam;
      default:
        return defaultPoster;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await fetchMovieById(movieId);
        if (response.data.length === 0) {
          setErr("Not Found");
        }
        console.log(response.data);
        setMovieDetails(response.data);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErr("Bad Request");
        }
        else {
          console.log(error.message);
          setErr("Not Found");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }
  if (err === "Not Found") {
    return <NotFound />
  }
  if (err === "Bad Request") {
    return <BadRequest />
  }
  return (


    <div className='movie-parent'>
      <div className="movie-details-container">
        <div className="movie-details-poster-container">
          <img src={getPosterImage(movieDetails.title)} alt={movieDetails.title} style={{ maxWidth: "200px" }} />
          <h3>About</h3>
          <div className="movie-details-description">
            <p> {movieDetails.plot}</p>
          </div>
        </div>

        <div className="movie-details-info-container">
          <div className="info-fragment fragment-general">
            <div className="movie-details-info info-title info-fragment-title">
              {movieDetails.title}
            </div>

            <div className="movie-details-info info-rating">
              <div className="movie-details-info-label">IMDB Rating :</div>
              <FontAwesomeIcon
                style={{ marginRight: "0.5rem" }}
                icon={faStar}
              />

              {movieDetails.ratings.imdb}
            </div>

            <div className="movie-details-info info-genre">
              <div className="movie-details-info-label">Genre :</div>
              <FontAwesomeIcon
                style={{ marginRight: "0.5rem" }}
                icon={faTag}
              />


              <ul className="movie-details-genre-ul">
                {movieDetails.genre.map((g) => (
                  <li className="movie-details-genre-li" key={g}>{g}</li>
                ))}
              </ul>
            </div>

            <div className="movie-details-info info-runtime">
              <div className="movie-details-info-label">Runtime :</div>
              {movieDetails.duration} min
            </div>

            <div className="movie-details-info info-released">
              <div className="movie-details-info-label">Released :</div>
              {movieDetails.releaseDate}
            </div>


          </div>

          <div className="info-fragment fragment-cast">
            <div className="info-fragment-title">Cast</div>
            {movieDetails.cast.map((c) => (
              <div className="cast-info-container">


                <div className="cast-info-details">
                  <span> {c} </span>

                </div>
              </div>
            ))}
          </div>


        </div>

      </div>
      <div className="theater-detail-container">
        <div className="center-button">
          <button className="show-theaters-btn" onClick={handleShowTheaters}>Show Theaters</button>
        </div>
        <div className='theater-list'>
          {showTheatersButtonClicked && (
            <div className="theater-grid">
              {theaters.map((theater) => (
                <Link to={`/theater/${theater._id}`}>
                  <div className="theater-item" key={theater._id}>{theater.name} <br />{theater.address}</div>
                </Link>
              ))}
            </div>

          )}
        </div>
      </div>
    </div>




  )
}

export default Movie