import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchTheatersOnLocation } from '../../api';
import TheaterItem from '../../components/TheaterItem';
import Navbar from '../../components/Navbar';
import NavbarSearch from '../../components/NavbarSearch';
import "../../styles/TheaterList.css"

function AllTheaters() {
    const [allTheaters, setAllTheaters] = useState([]);
    const location = useLocation();
    const { location: locationParam } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchTheatersOnLocation(locationParam);
                if (response.data.length === 0) {
                    setErr("Not Theater on this Location");
                }
                else {
                    setAllTheaters(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

    }, [locationParam])

    return (

        <div className="theater-detail-container">

            <h1 >Theaters in {locationParam}</h1>

            <div className="theater-grid">

                {allTheaters.map((theater) => (
                    <TheaterItem key={theater._id} theater={theater} />

                ))}
            </div>
        </div>

    )
}

export default AllTheaters