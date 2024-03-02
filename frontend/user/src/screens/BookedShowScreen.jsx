import React from 'react';
import { FlatList, Image, View, Text, StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import Card from '../components/CardB/Card';
import PosterImg1 from '../../assets/images/poster.png';
import PosterImg2 from '../../assets/images/poster2.png';
import PosterImg3 from '../../assets/images/poster3.png';
import PosterImg4 from '../../assets/images/poster4.png';
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
    paddingTop:15,
    paddingHorizontal:5,
  },
});


const cardArray = [
  {
    id: 1,
    thumbnail: PosterImg1,
    moviename: 'John Wick: Chapter 1',
    location: 'Inox Patel Nagar, Delhi',
    bookedSeats: ['A1', 'A2', 'B1', 'B2'],
    qrcode: QRImg,
    date:'22-Oct-2023'
  },
  {
    id: 2,
    thumbnail: PosterImg2,
    moviename: 'John Wick: Chapter 1',
    location: 'Inox Patel Nagar, Delhi',
    bookedSeats: ['A1', 'A2', 'B1', 'B2'],
    qrcode: QRImg,
    date:'22-Oct-2023'
  },
  {
    id: 3,
    thumbnail: PosterImg3,
    moviename: 'John Wick: Chapter 1',
    location: 'Inox Patel Nagar, Delhi',
    bookedSeats: ['A1', 'A2', 'B1', 'B2'],
    qrcode: QRImg,
    date:'22-Oct-2023'
  },
  {
    id: 4,
    thumbnail: PosterImg4,
    moviename: 'John Wick: Chapter 1',
    location: 'Inox Patel Nagar, Delhi',
    bookedSeats: ['A1', 'A2', 'B1', 'B2'],
    qrcode: QRImg,
    date:'22-Oct-2023'
  },
]