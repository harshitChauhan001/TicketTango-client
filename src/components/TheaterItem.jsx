import React from 'react';
import { Link } from 'react-router-dom';

const TheaterItem = ({ theater }) => {
    return (
        <div className="theater-item" key={theater._id}>
            <Link to={`/theater/${theater._id}`}>
                <h2>{theater.name}</h2>
                <p><strong>Capacity:</strong> {theater.capacity}</p>
                <p><strong>Address:</strong> {theater.address}</p>
            </Link>
        </div>
    );
};

export default TheaterItem;
