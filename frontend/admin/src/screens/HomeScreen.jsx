import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Home from '../components/home/Home';
import ScreenWrapper from './ScreenWrapper';
import { getTotalMovieCount } from '../redux/features/movie/MovieSlice';
import { getTotalCinemaCount, getNewCinema } from '../redux/features/cinema/CinemaSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const HomeScreem = ({ navigation }) => {
    const dispatch = useDispatch();
    // const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        dispatch(getTotalMovieCount())
        dispatch(getTotalCinemaCount())
        dispatch(getNewCinema())
    }, []);

    const apiHit = () => {
        // setRefreshing(true);
        dispatch(getTotalMovieCount())
        dispatch(getTotalCinemaCount())
        dispatch(getNewCinema())
    }

    return (
        <View style={styles.container}>
            <ScreenWrapper title="Dashboard" />
            <ScrollView
                showsVerticalScrollIndicator={false} nestedScrollEnabled={true}
                contentContainerStyle={{ justifyContent: 'center' }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={apiHit}
                        colors={['#F55139']}
                    />
                }
            >
                <Home navigation={navigation} />
            </ScrollView>
        </View>
    )
}
export default HomeScreem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
