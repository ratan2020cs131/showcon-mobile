import axios from 'axios';
import BASE_URL from './baseUrl';

export const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append('image', {
            uri: image,
            type: 'image/jpeg', // or the MIME type of your image
            name: 'image.jpg', // the name the server will receive the file as
        });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        const res = await axios.post(`${BASE_URL}/upload/image`, formData, config);
        return res.data;
    } catch (err) {
        console.log("Image upload err: ", err);
    }
}