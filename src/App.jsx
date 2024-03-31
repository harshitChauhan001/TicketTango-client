import './App.css'
import { BrowserRouter as Router } from "react-router-dom"
import { useState } from 'react'

import AllRoutes from './AllRoutes'
import Navbar from './components/Navbar'
import NavbarSearch from './components/NavbarSearch'
import Footer from './components/Footer'


function App() {

  const [inputClicked, setInputClicked] = useState(false);

  const handleInputClick = (clicked) => {
    setInputClicked(clicked);
  };
  const handleBackClick = (clicked) => {
    setInputClicked(clicked);
  }
  // PAYMENT AND ALL


  return (
    <div style={{ width: '100%', height: '100%' }}>
      {inputClicked ?
        <Router>

          <NavbarSearch OnBackClick={handleBackClick} />
        </Router>


        :
        <div style={{ width: '100%', height: '100%' }}>

          <Router>
            <Navbar onInputClick={handleInputClick} />
            <AllRoutes />
            <Footer />
          </Router>


        </div>
      }

    </div>

  )
}

export default App
