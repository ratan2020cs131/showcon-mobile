import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TotalCinemas from './SquareCard';
import { movie } from '../../redux/features/movie/MovieSlice';
import { cinema } from '../../redux/features/cinema/CinemaSlice';
import { useSelector } from 'react-redux';
import Shimmer from '../Shimmer'
import RectandleCard from './RectangleCard';
import Chart from './Chart';

const Home = ({ navigation }) => {
  const movieState = useSelector(movie);
  const cinemaState = useSelector(cinema);


  return (
    <View style={styles.container}>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 28 }}>
        <View style={{ gap: 22 }}>
          {cinemaState.newCinemas === null ?
            <Shimmer style={{ width: 130, height: 130, borderRadius: 7 }} /> :
            <TotalCinemas count={cinemaState.newCinemas.length}
              title="New Cinemas" color="#1bac90"
              route="ApproveCinema"
              navigation={navigation}
            />
          }
          {false ?
            <Shimmer style={{ width: 130, height: 130, borderRadius: 7 }} /> :
            <TotalCinemas count={"₹5.3M"} title="Total Revenue" color='#1bac90' />
          }
        </View>
        {cinemaState.totalCinemas === null || movieState.totalMovies === null ?
          <Shimmer style={{ width: 150, height: 'auto', borderRadius: 7 }} /> :
          <RectandleCard style={{ width: 150 }}
            data1={{ value: cinemaState.totalCinemas, title: "Total Cinemas" }}
            data2={{ value: movieState.totalMovies, title: "Total Movies" }}
          />
        }
      </View>
      <Chart />
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 22
    // justifyContent: 'space-around'
  }
})

