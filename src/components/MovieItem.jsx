import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import defaultPoster from "../assets/Padmaavat.jpg";
import Brahmastra from "../assets/Brahmastra.jpg";
import Pathaan from "../assets/Pathaan.jpg";
import Padmaavat from "../assets/Padmaavat.jpg";
import RRR from "../assets/RRR.jpg";
import Yodha from "../assets/Yodha.jpg";
import GangubaiKathiawadi from "../assets/GangubaiKathiawadi.jpg";
import Kgf from "../assets/K.G.F.Chapter2.jpg";
import RadheShyam from "../assets/RadheShyam.jpg"
import "../styles/MovieItem.css";


const MovieItem = ({ movie, onItemClick }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        onItemClick(movie._id);
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

    return (
        <div className="movie-item-container">
            <div key={movie._id} onClick={handleClick}>
                <div className="movie-item-poster">
                    <img src={getPosterImage(movie.title)} alt={movie.title} />
                </div>
                <div className="movie-item-title"><h4>{movie.title}</h4></div>
                <div className="movie-item-ratings">
                    <strong>IMDb:</strong>  {movie.ratings.imdb}
                    <FontAwesomeIcon className='fontAwesome-icons' icon={faStar} />
                </div>
                <div className="movie-item-genre">
                    <div>
                        {movie.genre.join(', ')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieItem;
