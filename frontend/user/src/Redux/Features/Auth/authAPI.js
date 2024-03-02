import BASE_URL from '../../../api/BaseUrl';
import axios from 'axios';
import axiosToken from '../../../api/axiosToken';
import AsyncStorage from "@react-native-async-storage/async-storage";

const signin = async (credentials) => {
    try {
        console.log("api ", credentials);
        const { mobileNo } = credentials;
        const response = await axios.get(`${BASE_URL}auth/signin/${mobileNo}`);
        console.log("verify number api res: ", response.data);
        return response.data.flag;
    }
    catch (err) {
        console.log("Login Error: ", err)
    }
}

const verify = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}auth/verify`, credentials);
        console.log("pass/otp verification res: ", response.data);
        return response.data;
    }
    catch (err) {
        console.log("Verify Error: ", err)
    }
}

const register = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}auth/register`, credentials);
        return response.data.token;
    }
    catch (err) {
        console.log("Register Error: ", err)
    }
}

const getProfile = async () => {
    try {
        const response = await axiosToken.get(`${BASE_URL}auth/profile`);
        return response.data;
    }
    catch (err) {
        console.log("GetProfile Error: ", err)
    }
}

const update = async (data) => {
    try {
        const response = await axiosToken.put(`${BASE_URL}auth/profile`, data);
        return response.data;
    }
    catch (err) {
        console.log("UpdateProfile Error: ", err)
    }
}

const logout = async () => {
    try {
        const response = await axiosToken.get(`${BASE_URL}auth/logout`);
        await AsyncStorage.removeItem('token');
        return response.data;
    }
    catch (err) {
        console.log("Logout Error: ", err)
    }
}

const authApi = {
    signin,
    verify,
    register,
    getProfile,
    update,
    logout
}

export default authApi;