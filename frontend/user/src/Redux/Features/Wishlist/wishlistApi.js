import axios from "../../../api/axiosToken";
import BASE_URL from "../../../api/BaseUrl";

const getWishlist = async (coordinates) => {
    try {
        const res = await axios.get(`${BASE_URL}favourite/`);
        console.log("get wishlist api res: ", res.data);
        return res.data;
    } catch (err) {
        console.log("Get wishlist api error: ", err.message);
    }
}

const addWishlist = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}favourite/`, data);
        console.log("add wishlist res: ", res.data);
        return res.data;
    } catch (err) {
        console.log("Add to wishlist api error: ", err.message);
    }
}

const removeWishlist = async (body) => {
    try {
        const res = await axios.delete(`${BASE_URL}favourite/`, { data: body });
        console.log("remove wishlist res: ", res.data);
        return res.data;
    } catch (err) {
        console.log("Remove to wishlist api error: ", err.message);
    }
}

export default {
    getWishlist,
    addWishlist,
    removeWishlist
}