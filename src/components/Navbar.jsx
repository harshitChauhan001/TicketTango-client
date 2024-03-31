import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchTheaterByName, fetchTheatersOnLocation } from '../api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";

import "../styles/Navbar.css"

function Navbar({ onInputClick }) {
    const [locationSearchTerm, setLocationSearch] = useState('');
    const [locationSearchValid, setLocationSearchValid] = useState(true);
    const [selectedCity, setSelectedCity] = useState('');


    const navigate = useNavigate();
    const location = useLocation();

    const userDataString = sessionStorage.getItem('userData');
    const userData = userDataString ? JSON.parse(userDataString) : null;


    const handleLocationSearch = async () => {
        try {
            const response = await fetchTheatersOnLocation(locationSearchTerm);
            const theaters = response.data;
            if (theaters.length > 0) {
                setSelectedCity(locationSearchTerm);
            } else {
                setLocationSearchValid(false);
            }
        } catch (error) {
            console.log(error);
            setLocationSearchValid(false);
        }
    };

    const handleCityChange = (e) => {
        const city = e.target.value;
        const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
        setSelectedCity(capitalizedCity);
        localStorage.setItem('userLocation', e.target.value);
    };

    const handleCitySubmit = () => {

        navigate(`/theater/AllTheaters/${selectedCity}`);
    };



    const handleKeyPress = (e, handler) => {
        if (e.key === 'Enter' && e.target.value.trim() !== "") {
            handler();
        }


    }

    const handleLogout = () => {
        sessionStorage.removeItem('userData');
        navigate('/');
    };

    useEffect(() => {
        const savedLocation = localStorage.getItem('userLocation');
        if (savedLocation) {
            setSelectedCity(savedLocation);
        }


        setLocationSearchValid(true);
    }, [location.pathname])

    return (
        <div className='navbar-container'>
            <div className={'nav-item home-icon'}>
                <Link to='/'>
                    <img className='main-icon' src='https://i.ibb.co/zPBYW3H/imgbin-bookmyshow-office-android-ticket-png.png' alt="BookMyShow Logo" />
                </Link>
            </div>
            <div className='nav-item navbar-form'>
                <form className='navbar-form-class'>
                    <div className='navbar-form-items'>
                        <input
                            className='theater-search'
                            type='text'
                            placeholder={'Search Movies, Theaters...'}
                            onFocus={() => onInputClick(true)}
                        />
                    </div>
                    <div className='navbar-form-items'>

                        <input className='theater-location-search'
                            type='text'
                            placeholder='Enter Your City'
                            value={selectedCity}
                            onChange={handleCityChange}
                            onKeyDown={(e) => handleKeyPress(e, handleCitySubmit)}
                        />
                        <FontAwesomeIcon className='fontAwesome-icons' icon={faForward} onClick={handleCitySubmit} />
                        {!locationSearchValid && <p className='error-message' style={{ color: 'red' }}>Enter a valid location</p>}
                    </div>

                </form>
                <div className='nav-item nav-link'>
                    <Link to="/upcomingShows" className='nav-links'>Upcoming Shows</Link>
                    <Link to="/previouslyWatchedShows" className='nav-links'>Previously Watched</Link>
                </div>
                <div className='nav-item navbar-user'>
                    {userData ? (
                        <div className='user-info'>
                            <span>{userData.user.first_name[0]}</span>
                            <button className='logout-button' onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <button className='login-button'><Link to="/auth" className='login-button' >Log in</Link></button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;

