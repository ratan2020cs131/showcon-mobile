import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TotalCinemas from './SquareCard';
import { getTotalCinemaCount, getTotalMovieCount, movie } from '../../redux/features/movie/MovieSlice'
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const movieState = useSelector(movie);
  useEffect(() => {
    dispatch(getTotalMovieCount())
    dispatch(getTotalCinemaCount())
  }, [])
  return (
    <View style={styles.container}>
      <View style={{gap:20}}>
        <TotalCinemas count={movieState.totalMovies} title="Total Movies" />
        <TotalCinemas count={movieState.totalCinemas} title="Total Cinemas" />
      </View>
      <TotalCinemas count={"₹5.3M"} title="Total Revenue" color='#1bac90' />
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    // alignItems:'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

