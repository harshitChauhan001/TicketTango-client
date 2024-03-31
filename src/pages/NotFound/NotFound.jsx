import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import NavbarSearch from '../../components/NavbarSearch';


function NotFound() {
    

    const navigate = useNavigate();
    return (
      
        <div>
            <h1>404- Not Found</h1>
            <p>The request page or resource could not be found.</p>
            <Link to="/">Go to Home page</Link>
                    </div>
                    
    )
}

export default NotFound