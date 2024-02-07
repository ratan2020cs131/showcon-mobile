import axios from '../../../utils/axiosInstance';
import BASE_URL from '../../../utils/baseUrl';

const searchApi = async (param) => {
    try {
        console.log("search api: ", param);
        let res;
        if (param !== '') {
            res = await axios.get(`${BASE_URL}/movie/search?title=${param}`);
        } else {
            res = await axios.get(`${BASE_URL}/movie/search`);
        }
        console.log("search api res: ", res.data);
        return res.data;
    } catch (err) {
        console.log("Search movie error: ", err.message);
    }
}

export default {
    searchApi
}