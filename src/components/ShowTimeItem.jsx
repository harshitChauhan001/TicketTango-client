import React from 'react';
import "../styles/ShowTimeItem.css"

const ShowTimeItem = ({ show }) => {
    const dateTime = new Date(show.dateTime);

    const formattedDate = dateTime.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const formattedTime = dateTime.toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    return (
        <div className='showTime-item-container' key={show._id}>
            <p><strong>Date:</strong> {formattedDate}</p>
            <p><strong>Time:</strong> {formattedTime}</p>
            <p><strong>Ticket Price:</strong> {show.ticketPrice}</p>
        </div>
    );
};

export default ShowTimeItem;
