import axios from '../../../utils/axiosInstance';
import BASE_URL from '../../../utils/baseUrl';

const addNewMovie = async(data)=>{
    try{
        const res = await axios.post(`${BASE_URL}/admin/movie`, data);
        return res.status;
    }catch(err){
        console.log("Add new movie error: ", err.message);
    }
}

const getTotalMovieCount = async()=>{
    try{
        const res = await axios.get(`${BASE_URL}/admin/movies-count`);
        console.log("get total movie res: ",res.data.count);
        return res.data.count;
    }catch(err){
        console.log("Get total movies error: ", err.message);
    }
}

const getTotalCinemaCount = async()=>{
    try{
        const res = await axios.get(`${BASE_URL}/admin/cinemas-count`);
        console.log("get total cinema res: ",res.data.count);
        return res.data.count;
    }catch(err){
        console.log("Get total cinema error: ", err.message);
    }
}

export default {
    addNewMovie,
    getTotalMovieCount,
    getTotalCinemaCount
}