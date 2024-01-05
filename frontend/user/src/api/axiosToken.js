import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosToken = axios.create({});

axiosToken.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('token');
        config.headers.Authorization = `${token}`;
        // console.log("token: ",config.headers.Authorization);
        return config;
    } catch (error) {
        throw error;
    }
});

export default axiosToken;