import axiosToken from '../../../api/axiosToken';
import BASE_URL from "../../../api/BaseUrl";

const createTicket = async (data) => {
    try {
        console.log("hi from api: ",data);
        const response = await axiosToken.post(`${BASE_URL}ticket/`, data);
        return response.data;
    } catch (err) {
        console.log("Get Movie Error: ", err);
    }
};

const ticketAPI = {
    createTicket
};

export default ticketAPI;