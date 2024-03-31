import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import PanoramaView from "@lightbase/react-native-panorama-view";
import { Dimensions } from 'react-native';

const BookedShowScreen = ({ navigation }) => {

    return (
        <ScreenWrapper title={"Immersive View"}>
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <PanoramaView
                        style={styles.viewer}
                        dimensions={{ height: 230, width: Dimensions.get("window").width }}
                        inputType="mono"
                        imageUrl="https://raw.githubusercontent.com/googlevr/gvr-android-sdk/master/assets/panoramas/testRoom1_2kMono.jpg"
                    />
                </View>
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
    container: {
        flex: 1,
    },
    viewer: {
        height: 230,
    },
});