import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalStyles from '../../GlobalStyles';
import Shimmer from '../Shimmer';
import SuccessAnimation from '../Success';
import { cinema, approveCinema, setApprove } from '../../redux/features/cinema/CinemaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Approve = ({ navigation }) => {
    const cinemaState = useSelector(cinema);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cinemaState.isApproving === false && cinemaState.aprrovingId !== null) {
            const closeSuccess = setTimeout(() => dispatch(setApprove({ id: null })), 2000);
            return () => clearTimeout(closeSuccess);
        }
    }, [cinemaState.isApproving])

    return (
        <View style={styles.container}>
            {cinemaState.newCinemas.length > 0 ?
                cinemaState.newCinemas.map((item, index) => (
                    <CinemaCard key={index} data={item} />
                )) :
                <View  style={{alignItems:'center'}}>
                    <MaterialCommunityIcons name="movie-open-off-outline" size={124} color="#c0c0c0" />
                    <Text style={[GlobalStyles.boldText, {fontSize:20, color:'#c0c0c0'}]}>Nothings here</Text>
                </View>
            }
            {cinemaState.isApproving === false && cinemaState.aprrovingId !== null &&
                <SuccessAnimation modal={true} title="Cinema Approved" />
            }
        </View>
    )
}
export default Approve;



const CinemaCard = ({ data }) => {
    const dispatch = useDispatch();
    const cinemaState = useSelector(cinema);
    const [address, setAddress] = useState('...');
    const [seats, setSeats] = useState('...');
    useEffect(() => {
        setAddress(data.address.city + ", " + data.address.state + ", " + data.address.zipcode)
        let totalSeats = 0;
        data.screen.forEach((screen) => {
            screen.seatmap.forEach((seatmap) => {
                totalSeats += seatmap.seats.length;
            })
        })
        setSeats(totalSeats)
    }, [])

    const approveHandler = (action) => {
        let toApprove = {
            id: data._id,
            action: action
        }
        dispatch(setApprove({ id: data._id }))
        dispatch(approveCinema(toApprove))
    }


    return (
        <>
            {cinemaState.aprrovingId === data._id ?
                <Shimmer style={{ width: '97%', height: 213, borderRadius: 7 }} /> :
                <View style={styles.card}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={[GlobalStyles.boldText, { fontSize: 16 }]}>{data.title}</Text>
                            <Text numberOfLines={2} style={GlobalStyles.normalText}>{address}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={GlobalStyles.normalText}>Total Seats: </Text>
                                <Text style={[GlobalStyles.semiBoldText, { paddingHorizontal: 5, fontSize: 16 }]}>{seats}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={GlobalStyles.normalText}>Total Screens: </Text>
                                <Text style={[GlobalStyles.semiBoldText, { paddingHorizontal: 5, fontSize: 16 }]}>{data.screen.length}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={GlobalStyles.normalText}>Type: </Text>
                                <Text style={[GlobalStyles.semiBoldText, { paddingHorizontal: 5, fontSize: 15 }]}>{data.type.map((i, index) => index === data.type.length - 1 ? i : i + ", ")}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={GlobalStyles.normalText}>Owner: </Text>
                                <Text style={[GlobalStyles.semiBoldText, { paddingHorizontal: 5, fontSize: 16 }]}>{data.owner?.fname + " " + data.owner?.lname}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={GlobalStyles.normalText}>Email: </Text>
                                <Text style={[GlobalStyles.semiBoldText, { paddingHorizontal: 5, fontSize: 16 }]}>{data.owner?.email}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={[GlobalStyles.buttonOutlined, { borderColor: '#101010', height: 35, width: '50%', maxWidth: 150 }]}
                            onPress={() => approveHandler('discard')}
                        >
                            <Text style={GlobalStyles.boldText}>Discard</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[GlobalStyles.button, { height: 37, width: '50%', maxWidth: 150 }]}
                            onPress={() => approveHandler('true')}
                        >
                            <Text style={[GlobalStyles.boldText, { color: '#fff', fontSize: 16 }]}>Approve</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        width: '100%',
        alignItems: 'center',
        gap: 20
    },
    card: {
        gap: 15,
        width: '100%',
        maxWidth: 350,
        padding: 10,
        borderRadius: 7,
        elevation: 10,
        backgroundColor: '#e0e0e0'
    }
})
