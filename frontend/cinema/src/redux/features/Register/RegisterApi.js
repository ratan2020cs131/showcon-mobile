import axios from '../../../utils/axiosInstance';
import BASE_URL from '../../../utils/baseUrl';

const getAddress = async(coordinates)=>{
    try{
        const res = await axios.get(`${BASE_URL}/location/address?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`);
        console.log("get address api res: ", res.data);
        return res.data;
    }catch(err){
        console.log("Get address api error: ", err.message);
    }
}

const registerCinema = async(data)=>{
    try{
        console.log("Register cinema api: ",data);
        const res = await axios.post(`${BASE_URL}/cinema/register`, data)
        return res.data;
    }catch(err){
        console.log("Register cinema api error: ", err.message);
    }
}

const getCinema = async(data)=>{
    try{
        console.log("Get cinema api: ",data);
        const res = await axios.get(`${BASE_URL}/cinema/`)
        console.log("get cinema api res: ",res.data);
        return res.data;
    }catch(err){
        console.log("Get cinema api error: ", err.message);
    }
}

export default {
    getAddress,
    registerCinema,
    getCinema
}