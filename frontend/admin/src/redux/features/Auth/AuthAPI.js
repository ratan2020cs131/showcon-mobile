import BASE_URL from '../../../utils/baseUrl';
import axios from 'axios'
import axiosToken from '../../../utils/axiosInstance';
import AsyncStorage from "@react-native-async-storage/async-storage";

const signin = async (mobileNo) => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/signin/${mobileNo}`);
        return response.data.flag;
    }
    catch (err) {
        console.log("Login Error: ", err)
    }
}

const verify = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/verify`, credentials);
        if (!response.data.role || response.data.role !== 'admin') {
            throw new Error("Non-admin Access Denied")
        }
        return response.data;
    }
    catch (err) {
        console.log("Verify Error: ", err)
        return { error: err.message }
    }
}

const register = async (credentials) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, credentials);
        return response.data.token;
    }
    catch (err) {
        console.log("Register Error: ", err)
    }
}

const getProfile = async () => {
    try {
        const response = await axiosToken.get(`${BASE_URL}/auth/profile`);
        return response.data;
    }
    catch (err) {
        console.log("GetProfile Error: ", err)
    }
}

const update = async (data) => {
    try {
        const response = await axiosToken.put(`${BASE_URL}/auth/profile`, data);
        return response.data;
    }
    catch (err) {
        console.log("UpdateProfile Error: ", err)
    }
}

const logout = async () => {
    try {
        const response = await axiosToken.get(`${BASE_URL}/auth/logout`);
        await AsyncStorage.removeItem('token');
        return response.data;
    }
    catch (err) {
        console.log("Logout Error: ", err)
    }
}

export default {
    signin,
    verify,
    register,
    getProfile,
    update,
    logout
}