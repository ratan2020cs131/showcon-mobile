import React from 'react';
import { FlatList, Image, View, Text, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import GlobalStyles from '../GlobalStyles';

const BookedShowScreen = ({ navigation }) => {

  const DATA = [
    {
      id: 1,
      thumbnail: 'https://i.pravatar.cc/112',
      movieName: 'Movie-A',
      location: 'Theater-A',
      bookedSeats: ['B1'],
      barcode: 'https://i.pravatar.cc/112'
    },
    {
      id: 2,
      thumbnail: 'https://i.pravatar.cc/112',
      movieName: 'Movie-A',
      location: 'Theater-A',
      bookedSeats: ['B1', 'A1'],
      barcode: 'https://i.pravatar.cc/112'
    },
    {
      id: 3,
      thumbnail: 'https://i.pravatar.cc/112',
      movieName: 'Movie-A',
      location: 'Theater-A',
      bookedSeats: ['B1', 'A1', 'C1'],
      barcode: 'https://i.pravatar.cc/112'
    },
    {
      id: 4,
      thumbnail: 'https://i.pravatar.cc/112',
      movieName: 'Movie-A',
      location: 'Theater-A',
      bookedSeats: ['B1', 'A1', 'C1', 'D1'],
      barcode: 'https://i.pravatar.cc/112'
    },
    {
      id: 5,
      thumbnail: 'https://i.pravatar.cc/112',
      movieName: 'Movie-A',
      location: 'Theater-A',
      bookedSeats: ['B1', 'A1', 'C1', 'B1', 'A1'],
      barcode: 'https://i.pravatar.cc/112'
    },
    {
      id: 6,
      thumbnail: 'https://i.pravatar.cc/112',
      movieName: 'Movie-A',
      location: 'Theater-A',
      bookedSeats: ['B1', 'A1', 'C1', 'B1', 'A1', 'E1'],
      barcode: 'https://i.pravatar.cc/112'
    }
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.column1}>
        <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />
      </View>
      <View style={styles.column2}>
        <View style={styles.row1}>
          <Text style={[styles.movieName, GlobalStyles.boldText]}>{item.movieName}</Text>
          <Text style={[styles.location, GlobalStyles.normalText]}>{item.location}</Text>
        </View>
        <View style={styles.row2}>
          <View style={styles.bookedSeatsColumn}>
            <Text style={[GlobalStyles.normalText, styles.bookedSeatsText]}>Booked Seats</Text>
            <View style={styles.bookedSeatsContainer}>
              {item.bookedSeats.map((seat, index) => (
                <Text key={index} style={[styles.bookedSeat, GlobalStyles.normalText]}>
                  {seat}
                </Text>
              ))}
            </View>
          </View>
          <Image style={styles.barcode} source={{ uri: item.barcode }} />
        </View>
      </View>
    </View>
  );

  return (
    <ScreenWrapper title={"History"}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default BookedShowScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  column1: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 1, // Maintain aspect ratio
    borderRadius: 10,
  },
  column2: {
    width: '60%',
  },
  row1: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
  },
  movieName: {
    fontSize: 18,
  },
  location: {
    fontSize: 14,
    color: '#777',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookedSeatsColumn: {
    width: '60%',
    padding: 10,
  },
  bookedSeatsText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bookedSeatsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  bookedSeat: {
    backgroundColor: '#1E1F22',
    color: 'white',
    borderRadius: 7,
    margin: 1,
    padding: 4,
    fontSize:10
  },
  barcode: {
    width: '40%',
    height: '100%',
    resizeMode: 'contain',
    marginLeft: 10,
  },
});
