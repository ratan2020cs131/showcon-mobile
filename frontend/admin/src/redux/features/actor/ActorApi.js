import axios from '../../../utils/axiosInstance';
import BASE_URL from '../../../utils/baseUrl';

const addNewActor = async(data)=>{
    try{
        console.log("post actor api: ",data);
        const res = await axios.post(`${BASE_URL}/admin/cast`, data);
        console.log("post actor api res : ",res.data);
        return res.data.result;
    }catch(err){
        console.log("Add new actor error: ", err.message);
    }
}

const getActors = async(data)=>{
    try{
        const res = await axios.get(`${BASE_URL}/admin/cast`);
        console.log("get actors api res: ",res.data);
        return res.data;
    }catch(err){
        console.log("get actors error: ", err.message);
    }
}

export default {
    addNewActor,
    getActors
}