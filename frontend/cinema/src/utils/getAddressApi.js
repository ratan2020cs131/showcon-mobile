import axios from 'axios';
import BASE_URL from './baseUrl';

export const imageDelete = async (coordinates) => {
    try {
        const {latitude,longitude}=coordinates;
        console.log("coordinates: ",coordinates);
        const res = await axios.delete(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_OPENCAGE_API_KEY`);
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log("Image delete err: ", err);
    }
}