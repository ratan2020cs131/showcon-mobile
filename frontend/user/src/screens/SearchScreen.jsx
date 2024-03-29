import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import Search from '../components/Search';

const BookedShowScreen = ({ navigation }) => {

    return (
        <ScreenWrapper title={"Search movie"}>
            <SafeAreaView style={styles.container}>
                <Search navigation={navigation} />
            </SafeAreaView>
        </ScreenWrapper>
    );
};

export default BookedShowScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 5,
    },
});