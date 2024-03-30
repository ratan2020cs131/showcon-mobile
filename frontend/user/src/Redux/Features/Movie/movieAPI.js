import BASE_URL from "../../../api/BaseUrl";
import axios from "axios";

const getMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}movie/1`);
    return response.data;
  } catch (err) {
    console.log("Get Movie Error: ", err);
  }
};

const getCinema = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}cinema/${id}`);
    return response.data;
  } catch (err) {
    console.log("Get cinema Error: ", err);
  }
};

const getMovieByCity = async (zipcode) => {
  try {
    console.log("get movie by city body: ", zipcode);
    const response = await axios.get(`${BASE_URL}user/get-city-movies?zipcode=${zipcode}`);
    return response.data;
  } catch (err) {
    console.log("Get movie by city Error: ", err);
  }
};

const getMovieByTime = async (data) => {
  try {
    const { zipcode, from, to, date } = data;
    console.log("get movie by time body: ", data);
    const response = await axios.get(`${BASE_URL}user/get-time-movies?date=${date}&from=${from}&to=${to}&zipcode=${zipcode}`);
    console.log("Get movie by time res: ", response.data);
    return response.data;
  } catch (err) {
    console.log("Get movie by time Error: ", err);
  }
};

const searchApi = async (param) => {
  try {
    console.log("search api: ", param);
    const res = await axios.get(`${BASE_URL}movie/search?title=${param}`);
    console.log("search api res: ", res.data);
    return res.data;
  } catch (err) {
    console.log("Search movie error: ", err.message);
  }
}

const getCinemaBooking = async (data) => {
  const { zipcode, movieId } = data;
  try {
    console.log("cinema booking api: ", movieId);
    const res = await axios.get(`${BASE_URL}user/get-cinema-booking?zipcode=${zipcode}&movieId=${movieId}`);
    console.log("cinema booking res: ", res.data);
    return res.data;
  } catch (err) {
    console.log("Search movie error: ", err.message);
  }
}


const movieAPI = {
  getMovies,
  getCinema,
  getMovieByCity,
  searchApi,
  getCinemaBooking,
  getMovieByTime
};

export default movieAPI;
