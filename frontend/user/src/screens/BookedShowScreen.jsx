import React from 'react';
import { FlatList, Image, View, Text, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import Card from '../components/CardB/Card';
import posterImg from '../../assets/images/poster.png';
import QRImg from '../../assets/images/qrcode.png';

const BookedShowScreen = ({ navigation }) => {

  return (
    <ScreenWrapper title={"History"}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={cardArray}
          renderItem={({ item, index }) => <Card key={item.id} item={item}/>}
          keyExtractor={(item)=>item.id}
        />
        {/* <Card item={cardArray[0]}/> */}
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default BookedShowScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:5,
  },
});


const cardArray = [
  {
    id: 1,
    thumbnail: posterImg,
    moviename: 'John Wick: Chapter 1',
    location: 'Inox Patel Nagar, Delhi',
    bookedSeats: ['A1', 'A2', 'B1', 'B2'],
    qrcode: QRImg,
    date:'22-Oct-2023'
  },
  {
    id: 2,
    thumbnail: posterImg,
    moviename: 'John Wick: Chapter 1',
    location: 'Inox Patel Nagar, Delhi',
    bookedSeats: ['A1', 'A2', 'B1', 'B2'],
    qrcode: QRImg,
    date:'22-Oct-2023'
  },
  {
    id: 3,
    thumbnail: posterImg,
    moviename: 'John Wick: Chapter 1',
    location: 'Inox Patel Nagar, Delhi',
    bookedSeats: ['A1', 'A2', 'B1', 'B2'],
    qrcode: QRImg,
    date:'22-Oct-2023'
  },
  {
    id: 4,
    thumbnail: posterImg,
    moviename: 'John Wick: Chapter 1',
    location: 'Inox Patel Nagar, Delhi',
    bookedSeats: ['A1', 'A2', 'B1', 'B2'],
    qrcode: QRImg,
    date:'22-Oct-2023'
  },
]