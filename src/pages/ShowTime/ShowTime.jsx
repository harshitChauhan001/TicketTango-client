import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSeatStatus, fetchShowTimeById, bookSeats } from '../../api';
import Seat from '../../components/Seat';
import Navbar from '../../components/Navbar';
import NavbarSearch from '../../components/NavbarSearch';
import "../../styles/Seat.css"
import "../../styles/ShowTime.css"

function ShowTime() {
    const { id } = useParams();
    const [showTime, setShowTime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [allSeats, setAllSeats] = useState([]);
    const [selectedSeatsIds, setSelectedSeatsIds] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const dateTime = showTime ? new Date(showTime.dateTime) : null;
    const [bookedSeats, setBookedSeats] = useState([]);

    const formattedDate = dateTime ? dateTime.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }) : null;

    const formattedTime = dateTime ? dateTime.toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }) : null;



    const navigate = useNavigate();





    const handleSeatClick = (_id) => {
        console.log(_id);
        console.log("seat is clicked");

        if (!selectedSeatsIds.includes(_id)) {
            setSelectedSeatsIds([...selectedSeatsIds, _id]);
            console.log("select")

        }
        else {
            setSelectedSeatsIds(selectedSeatsIds.filter(seat => seat !== _id));
            console.log("deselect")

        }

    };

    const handleBookSeats = async () => {
        try {
            const userDataString = sessionStorage.getItem('userData');
            const userData = JSON.parse(userDataString);
            const token = userData.token;
            const response = await bookSeats(selectedSeatsIds, id, token);
            console.log("Seats booked successfully:", response.data);
            alert("Ticket booking successfull.");
            navigate("/");
        } catch (error) {
            console.error('Error booking seats:', error);
        }
    };
    useEffect(() => {
        if (showTime) {

            setTotalPrice(selectedSeatsIds.length * showTime.ticketPrice);
        }
        else {
            setTotalPrice(0);
        }
    }, [selectedSeatsIds]);

    useEffect(() => {
        const userDataString = sessionStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const token = userData.token;
            if (token) {
                const fetchData = async () => {
                    try {
                        const response = await fetchShowTimeById(id);
                        const seatWithStatus = await fetchSeatStatus(id);
                        seatWithStatus.data.allSeats.sort((a, b) => a.seatNumber - b.seatNumber);

                        setShowTime(response.data);
                        setAllSeats(seatWithStatus.data.allSeats);
                        setBookedSeats(seatWithStatus.data.bookedSeats.map((s) => {
                            return s.seatId._id;
                        }));
                    } catch (error) {
                        console.error('Error fetching showtime:', error);
                    } finally {
                        setLoading(false);
                    }
                };
                fetchData();

            } else {
                console.log("Token not found in userData");
            }
        } else {
            alert('Please login to book seats for show');
            navigate("/auth");
        }

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (

        <div className='showtime-container'>
            <div className='showtime-movie-theater'>
                <div className='showtime-movie'> {showTime.movieTitle}</div>
                <div className='showtime-theater'>

                    <div>{showTime.theaterName}</div>
                    <div className='location'>
                        <p>{showTime.theaterLocation}</p></div>
                </div>
            </div>
            <div className='showtime-info'>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Time:</strong> {formattedTime}</p>
                <p><strong>Ticket Price:</strong> {showTime.ticketPrice}</p>
            </div>
            <div className='seat-container'>
                {allSeats.map((seat) => (
                    <Seat
                        key={seat._id}
                        id={seat._id}
                        isBooked={bookedSeats.includes(seat._id)}
                        rowNumber={seat.rowNumber}
                        seatNumber={seat.seatNumber}
                        seatType={seat.seatType}
                        onClick={() => handleSeatClick(seat._id)}
                        isSelected={selectedSeatsIds.includes(seat._id)}
                        disabled={bookedSeats.includes(seat.seatNumber)}
                    />
                ))}

            </div>
            {selectedSeatsIds.length > 0 && (<div className='ticket-booking-button'>

                <button onClick={handleBookSeats}>Pay: {totalPrice}</button>
            </div>
            )}

        </div>

    );
}

export default ShowTime;
