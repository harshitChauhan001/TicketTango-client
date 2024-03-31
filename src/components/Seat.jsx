import React from 'react';
import "../styles/Seat.css"

function Seat({ id, isBooked, rowNumber, seatNumber, seatType, onClick, isSelected, disabled }) {
  const handleClick = () => {
    console.log("inside the seat element", id)
    onClick(id);
  };

  return (
    <div className='row-container'>
      <div
        className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : ''} `}
        onClick={!isBooked ? handleClick : null}
      >
        {seatNumber}
       
      </div>
    </div>
  );
}

export default Seat;

