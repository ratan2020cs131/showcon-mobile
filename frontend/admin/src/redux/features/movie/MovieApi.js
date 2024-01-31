import axios from '../../../utils/axiosInstance';
import BASE_URL from '../../../utils/baseUrl';

const addNewMovie = async(data)=>{
    try{
        console.log("data before sending in add movie: ", data);
        const res = await axios.post(`${BASE_URL}/admin/movie`, data);
        console.log("add movie res: ",res.data);
        return res.status;
    }catch(err){
        console.log("Add new movie error: ", err.message);
    }
}

export default {
    addNewMovie
}