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

const movieAPI = {
  getMovies,
  getCinema
};

export default movieAPI;
