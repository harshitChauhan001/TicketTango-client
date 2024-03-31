import React, { useEffect, useState } from 'react'
import { fetchPreviouslyWatchedShows } from '../../api';
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import NavbarSearch from '../../components/NavbarSearch';

function PreviouslyWatchedShows() {

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
                        const response = await fetchPreviouslyWatchedShows(token);

                        setShows(response.data);
                    } catch (error) {
                        console.log(error)
                        if (error.response && error.response.status === 409) {
                            alert('Please login to see previously watched shows.');
                            navigate("/auth");
                        }
                        else if (error.response && error.response.status === 404) {
                            setErr("No Shows");
                        }
                        else {
                            setErr(error.message);
                        }
                    }
                }
                fetchData();
            } else {
                console.log("Token not found in userData");
            }
        } else {
            alert('Please login to see previously watched shows. last part');
            navigate("/auth");
        }
    }, [navigate]);

    return (
       
                    <div>
                        <h2>Previously  Watched Shows: </h2>
                        {err ? (
                            <p>{err}</p>
                        ) : (
                            shows.map((show) => (
                                <div key={show._id}>
                                    <p><strong>Movie Name:</strong> {show.movieId.title}</p>
                                    <p><strong>Theater Name:</strong> {show.theaterId.name}</p>
                                    <p><strong>Date & Time:</strong> {show.dateTime}</p>
                                </div>
                            ))
                        )}
                    </div>
                
    )
}

export default PreviouslyWatchedShows