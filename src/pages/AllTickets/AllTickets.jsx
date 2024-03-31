import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchAllTicketDetails } from '../../api';
import Navbar from '../../components/Navbar';
import NavbarSearch from '../../components/NavbarSearch';
import "../../styles/AllTickets.css"

function AllTickets() {
    const { id: showTimeId } = useParams();
    const [ticketDetails, setTicketDetails] = useState([]);
    const [err, setErr] = useState(null);


    const navigate = useNavigate();


    useEffect(() => {
        const userDataString = sessionStorage.getItem("userData");
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const token = userData.token;
            if (token) {
                const fetchData = async () => {
                    try {

                        const response = await fetchAllTicketDetails(token, showTimeId);
                        setTicketDetails(response.data);
                    } catch (error) {
                        console.log(error);
                        setErr(error.message);
                    }
                }
                fetchData();
            }
            else {
                console.log('token is not found in the userData');
            }
        }
        else {
            alert('Please Login to see ticket bookings.');
            navigate('/auth');
        }
    }, [])
    return (

        <div className='ticket-detail-container' ><h1>AllTickets</h1>
            {err ? (
                <p>Error: {err}</p>
            ) : (
                <div >
                    {ticketDetails.length > 0 ? (

                        <div className='ticket-list'>
                            {ticketDetails.map((ticket) => (
                                <div className='ticket-list-item' key={ticket._id}>
                                    <p>Ticket ID: {ticket._id}</p>
                                    <p>Show Date: {new Date(ticket.showTimeId.dateTime).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}</p>
                                    <p>Show Time: {new Date(ticket.showTimeId.dateTime).toLocaleTimeString('en-IN', {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true,
                                    })}</p>

                                    <p>Theater: {ticket.showTimeId.theaterId.name}</p>
                                    <p>Movie: {ticket.showTimeId.movieId.title}</p>
                                    <p>Seat Number: {ticket.seatId.seatNumber}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No ticket details available.</p>
                    )}
                </div>
            )
            }

        </div>

    )
}

export default AllTickets