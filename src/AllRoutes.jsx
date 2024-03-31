import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home/Home'
import Movie from './pages/Movie/Movie'
import Auth from './pages/Auth/Auth'
import Theater from './pages/Theater/Theater'
import AllTheaters from './pages/Theater/AllTheaters'
import ShowTime from './pages/ShowTime/ShowTime'
import UpcomingShows from './pages/ShowTime/UpcomingShows'
import PreviouslyWatchedShows from './pages/ShowTime/PreviouslyWatchedShows'
import AllTickets from './pages/AllTickets/AllTickets'


function AllRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movie/:id' element={<Movie />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/theater/:id' element={<Theater />} />
                <Route path='/theater/AllTheaters/:location' element={<AllTheaters />} />
                <Route path='/showTime/:id' element={<ShowTime />} />
                <Route path='/upcomingShows' element={<UpcomingShows />} />
                <Route path='/previouslyWatchedShows' element={<PreviouslyWatchedShows />} />
                <Route path='/tickets/:id' element={<AllTickets/> } />
                
            </Routes>
        </div>
    )
}

export default AllRoutes