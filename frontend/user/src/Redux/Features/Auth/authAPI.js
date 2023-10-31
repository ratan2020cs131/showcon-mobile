import BASE_URL from '../../../api/BaseUrl';
import axios from 'axios';

const signin = async (credentials) => {
    try {
        const {mobileNo} = credentials;
        const response = await axios.get(`${BASE_URL}auth/signin/${mobileNo}`, credentials);
        if (response.data) {
            console.log("response: ",response.data)
        }
        return response.data;
    }
    catch (err) {
        console.log("Login Error: ",err)
    }
}

const authApi = {
    signin,
}

export default authApi;