import BASE_URL from '../../../api/BaseUrl';
import axios from 'axios';

const signin = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/account/login`, credentials);
        if (response.data.token) {
            window.localStorage.setItem("token", response.data.token);
        }
        return response.data;
    }
    catch (err) {
        console.log(err)
        alert("Error Login");
    }
}

const authApi = {
    signin,
}

export default authApi;