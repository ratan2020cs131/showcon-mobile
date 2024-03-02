import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { FontAwesome, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import ScreenWrapper from './ScreenWrapper';
import GlobalStyles from '../GlobalStyles';

const MovieScreen = () => {
    const [selectedTimings, setSelectedTimings] = useState([]);

    const toggleTimingSelection = (timing) => {
        const isSelected = selectedTimings.includes(timing);
        if (isSelected) {
            setSelectedTimings(prevTimings => prevTimings.filter(time => time !== timing));
        } else {
            setSelectedTimings(prevTimings => [...prevTimings, timing]);
        }
    };

    const timeBlocks = [
        '9 AM - 12 PM',
        '1 PM - 4 PM',
        '5 PM - 8 PM',
        '9 PM - 12 AM'
    ];

    return (
        <ScreenWrapper title={"Add Movie"}>
            <View style={styles.container}>
                {/* Movie Title */}
                <View style={styles.section}>
                    <MaterialIcons name="title" size={20} color="black" />
                    <TextInput placeholder="Title" style={styles.input2} />
                </View>

                {/* Timings */}
                <Text style={[GlobalStyles.normalText, { color: 'black', marginBottom: 10 }]}>Timings</Text>

                <View style={styles.timeBlocksContainer}>
                    {timeBlocks.map((timing, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.timeBlock, {
                                backgroundColor: selectedTimings.includes(timing) ? '#64B5F6' : '#E0E0E0',
                            }]}
                            onPress={() => toggleTimingSelection(timing)}
                        >
                            <Text style={GlobalStyles.normalText}>{timing}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Save Button */}
                <TouchableOpacity style={[GlobalStyles.button, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }]} onPress={() => console.log(selectedTimings)}>
                    <Ionicons name='save' size={18} color={"black"} />
                    <Text style={[GlobalStyles.boldText, { paddingLeft: 5 }]}>SAVE</Text>
                </TouchableOpacity>

            </View>
        </ScreenWrapper>
    )
}

export default MovieScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        width: '85%',
        backgroundColor: '#E0E0E0',
        marginBottom: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderRadius: 7,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    input2: {
        color: 'black',
        borderWidth: 0,
        flex: 1,
        paddingHorizontal: 8
    },
    timeBlocksContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    timeBlock: {
        padding: 10,
        margin: 5,
        borderRadius: 7,
        alignItems: 'center',
    }
});
