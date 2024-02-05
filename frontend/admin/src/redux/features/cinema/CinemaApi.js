import axios from '../../../utils/axiosInstance';
import BASE_URL from '../../../utils/baseUrl';

const getTotalCinemaCount = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/admin/cinemas-count`);
        console.log("get total cinema res: ", res.data.count);
        return res.data.count;
    } catch (err) {
        console.log("Get total cinema error: ", err.message);
    }
}

const getNewCinema = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/admin/unapprove-cinema`);
        console.log("get new cinema res: ", res.data);
        return res.data;
    } catch (err) {
        console.log("Get new cinema error: ", err.message);
    }
}


export default {
    getTotalCinemaCount,
    getNewCinema
}