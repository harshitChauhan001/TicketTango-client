import React, { useEffect, useState } from 'react'
import { fetchUpcomingBookedShows } from '../../api';
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import NavbarSearch from '../../components/NavbarSearch';
import "../../styles/UpcomingShows.css"

function UpcomingShows() {
    const [shows, setShows] = useState([]);
    const [err, setErr] = useState(null);


    const navigate = useNavigate();



    useEffect(() => {
        const userDataString = sessionStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const token = userData.token;
            console.log(token);
            if (token) {
                console.log("Token found:", token);
                const fetchData = async () => {
                    try {
                        const response = await fetchUpcomingBookedShows(token);
                        console.log(response.data)
                        setShows(response.data);
                        console.log(response.data);
                    } catch (error) {
                        if (error.response && error.response.status === 401) {
                            alert('Please login to see upcoming shows.');
                            navigate("/auth");
                        } else {
                            console.log(error);
                            setErr(error.message);
                        }
                    }
                };
                fetchData();
            } else {
                console.log("Token not found in userData");
            }
        } else {
            alert('Please login to see upcoming shows');
            navigate("/auth");
        }
    }, [navigate]);
    return (

        <div className="show-detail-container">
            <h1>Upcoming Shows: </h1>
            {err ? (
                <p>Error: {err}</p>
            ) : (
                <div className="show-grid">{

                    shows.map((show) => (
                        <div className="show-item" key={show.show._id}>
                            <Link to={`/tickets/${show.show._id}`}>
                                <p><strong>Movie Name:</strong> {show.show.movieId.title}</p>
                                <p><strong>Theater Name:</strong> {show.show.theaterId.name}</p>
                                <p>Show Date: {new Date(show.show.dateTime).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}</p>
                                <p>Show Time: {new Date(show.show.dateTime).toLocaleTimeString('en-IN', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                })}</p>
                                <p className='booked-seat-Numbers'>
                                    Seats:
                                    {show.seatNumbers.map((seats) => seats.seatId.seatNumber).join(", ")}
                                </p>
                            </Link>
                        </div>
                    ))
                }
                </div >
            )}
        </div >

    )
}

export default UpcomingShows