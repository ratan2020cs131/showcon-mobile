import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import Poster from "../../components/Show/Poster";
import Cast from "../../components/Show/Cast";
import Places from "../../components/Show/Places";
import Description from "../../components/Show/Description";
import Rating from "../../components/Show/Rating";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getCinemaBooking, movie } from "../../Redux/Features/Movie/movieSlice";
import GetLocation from '../../utils/getLocation';
import { auth, getAddress } from '../../Redux/Features/Auth/authSlice';
import GlobalStyles from "../../GlobalStyles";

const Show = ({ navigation, route }) => {
    const { data, pincode } = route.params
    const dispatch = useDispatch();
    const movieState = useSelector(movie)
    const authState = useSelector(auth)

    const getCinemaData = async () => {
        const coords = await GetLocation();
        console.log(coords);
        dispatch(getAddress(coords))
    }
    useEffect(() => {
        if (!pincode)
            getCinemaData();
    }, [])

    useEffect(() => {
        console.log("hi");
        dispatch(getCinemaBooking({ zipcode: pincode ? pincode : authState.address.zipcode, movieId: data._id }))
    }, [authState.address])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.container}>
                <Poster id={data._id} title={data.title} image={data.primaryPoster} />
                {movieState.cinemaData?.length > 0 &&
                    <Places cinema={movieState.cinemaData} navigation={navigation} />
                }
                <Description data={data.description} />
                <Cast data={data.casts} />
                <Rating />

                {/* {movieState.cinemaData?.length > 0 &&
                    <TouchableOpacity style={[GlobalStyles.button]} onPress={() => navigation.navigate("SeatScreen", { data: movieState.cinemaData })}>
                        <Text style={[GlobalStyles.boldText, { fontSize: 16 }]}>Book Ticket</Text>
                    </TouchableOpacity>
                } */}
            </View>
        </ScrollView>
    )
}

export default Show;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#EEEEEE",
    },
});

