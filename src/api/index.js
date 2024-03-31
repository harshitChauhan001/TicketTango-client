import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

export const fetchAllMovies = () => API.get("/movie/allMovies");
export const fetchMovieById = (id) => API.get(`/movie/${id}`);
export const fetchMovieByNameAndGenre = (name, genre) =>
  API.get("/movie", {
    params: {
      name: name,
      genre: genre,
    },
  });
export const postMovie = (title, genres, releaseDate, posterUrl) =>
  API.post("/movie/addMovie", { title, genres, releaseDate, posterUrl });

export const signUp = (
  email,
  password,
  first_name,
  last_name,
  date_of_birth,
  gender,
  phone_number,

) =>
  API.post("/user/auth/register", {
    email,
    password,
    first_name,
    last_name,
    date_of_birth,
    gender,
    phone_number,
    
  });
export const logIn = (email, password) =>
  API.post("/user/auth/login", { email, password });
export const logOut = () => API.post("/user/auth/logout");

export const fetchAllTheaters = () => API.get("/theater/allTheaters");
export const fetchTheatersOnLocation = (location) =>
  API.get("/theater", {
    params: {
      location: location,
    },
  });
export const fetchTheaterByName = (name) =>
  API.get("/theater/name", {
    params: {
      name: name,
    },
  });
export const fetchTheaterById = (id) => API.get(`theater/${id}`);
export const fetchTheatersByMovie = (movieId, location) => API.get("/theater/byMovie", {
  params: {
    location: location,
    movieId:movieId
  }
})
export const postTheater = (name, address, location, capacity,token) =>
  API.post("/theater/createTheater", {
    name,
    address,
    location,
    capacity,
  },
    {
    headers: {
      Authorization: token
    },
  });

export const fetchAllShowTime = () => API.get("/showTime/allShows");
export const fetchShowTimeById = (id) => API.get(`/showTime/${id}`);
export const fetchAllShowTimeOnLocation = (location) =>
  API.get(`/showTime/${location}`);
export const fetchAllShowTimeOfTheater = (theaterId) =>
  API.get(`/showTime/theater/${theaterId}`);
export const fetchAllShowTimeOfTheaterForMoive = (theaterId, movieId) =>
  API.get(`/showTime/${theaterId}/${movieId}`);
export const fetchAllMoviesForTheater = (theaterId) =>
  API.get(`/showTime/${theaterId}/movies`);
export const fetchAllShowTimeOfTheaterByDate = (
  theaterId,
  startDate,
  endDate
) => API.get(`/${theaterId}/by-date-range/${startDate}/${endDate}`);
export const fetchPreviouslyWatchedShows = (token) =>
  API.get("/showTime/previouslyWatched", {
    headers: {
      Authorization: token
    },
  });
export const fetchUpcomingBookedShows = (token) =>
  API.get("/showTime/upcomingShows", {
    headers: {
      Authorization: token
    },
  });
export const postShowTime = (theaterId, movieName, dateTime, ticketPrice,token) =>
  API.post("/showTime/api/showTimes", {
    theaterId,
    movieName,
    dateTime,
    ticketPrice,
  },
    {
    headers: {
      Authorization: token
    },
  });

export const fetchSeatStatus = (showTimeId) =>
  API.get(`/seat/showTime/${showTimeId}`);
export const bookSeats = (seatIds, showTimeId,token) =>
  API.post("/seat/book", { seatIds, showTimeId }, {
    headers: {
      Authorization: token
    },
  });
export const postSeats = (seats, theaterId,token) =>
  API.post(`/seat/addSeats/${theaterId}`, { seats,theaterId }, {
    headers: {
      Authorization: token
    },
  });
  export const fetchAllTicketDetails = (token, showTimeId) => API.get(`/ticket/allTickets?showTimeId=${showTimeId}`, {
    headers: {
        Authorization: token
    }
});

