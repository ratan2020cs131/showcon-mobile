import axios from '../../../utils/axiosInstance';
import BASE_URL from '../../../utils/baseUrl';

const searchApi = async (param) => {
    try {
        console.log("search api: ", param);
        const res = await axios.get(`${BASE_URL}/movie/search?title=${param}`);
        console.log("search api res: ", res.data);
        return res.data;
    } catch (err) {
        console.log("Search movie error: ", err.message);
    }
}

export default {
    searchApi
}