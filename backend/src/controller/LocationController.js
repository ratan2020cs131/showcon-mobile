import axios from "axios";

const getAddress = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        if (!latitude || !longitude) {
            throw new Error("Coordinates not provided");
            return
        }
        const addressRes = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.OPENCAGE_KEY}`)
        if (addressRes) {
            res.send({
                city: addressRes.data.results[0].components.city ? addressRes.data.results[0].components.city : addressRes.data.results[0].components._normalized_city,
                zipcode: addressRes.data.results[0].components.postcode,
                state: addressRes.data.results[0].components.state,
                country: addressRes.data.results[0].components.country
            })
        } else {
            throw new Error("Error connecting to open cage")
        }
    } catch (err) {
        console.log("Get address error: ", err.message);
        res.send({ message: err.message })
    }
}

export default {
    getAddress
}