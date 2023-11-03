import BASE_URL from '../../../api/BaseUrl';
import axios from 'axios';

const getMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}movie/1`);
        return response.data;
    }
    catch (err) {
        console.log("Get Movie Error: ", err)
    }
}

const authApi = {
    getMovies,
}

export default authApi;