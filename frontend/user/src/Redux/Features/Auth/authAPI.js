import BASE_URL from '../../../api/BaseUrl';
import axios from 'axios';

const signin = async (credentials) => {
    try {
        const { mobileNo } = credentials;
        const response = await axios.get(`${BASE_URL}auth/signin/${mobileNo}`, credentials);
        return response.data.flag;
    }
    catch (err) {
        console.log("Login Error: ", err)
    }
}

const verify = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}auth/verify`, credentials);
        return response.data;
    }
    catch (err) {
        console.log("Verify Error: ", err)
    }
}

const authApi = {
    signin,
    verify
}

export default authApi;