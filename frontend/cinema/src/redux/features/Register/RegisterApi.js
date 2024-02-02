import axios from '../../../utils/axiosInstance';
import BASE_URL from '../../../utils/baseUrl';

const getAddress = async(coordinates)=>{
    try{
        console.log(coordinates);
        const res = await axios.get(`${BASE_URL}/location/address?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`);

        console.log("get address api res: ", res.data);
        return res.data;
    }catch(err){
        console.log("Get address api error: ", err.message);
    }
}

export default {
    getAddress
}