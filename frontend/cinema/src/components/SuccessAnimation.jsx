import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, Easing, Modal } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import GlobalStyles from '../GlobalStyles';

const SuccessAnimation = ({ modal, title }) => {
    const scaleValue = useRef(new Animated.Value(0)).current;

    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const close = setTimeout(() => setVisible(false), 2000);

        return () => {
            clearTimeout(close);
        }
    }, [])

    useEffect(() => {
        Animated.timing(scaleValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <>
            {modal ?
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={visible}
                >
                    <>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                            <View style={{ backgroundColor: '#fff', width: 85, height: 85, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <Animated.View
                                    style={{
                                        width: 110,
                                        height: 110,
                                        borderRadius: 50,
                                        backgroundColor: '#00d27f66',
                                        transform: [{ scale: scaleValue }],
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            width: 85,
                                            height: 85,
                                            borderRadius: 100,
                                            backgroundColor: '#00d27f80',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <View
                                            style={{
                                                width: 65,
                                                height: 65,
                                                borderRadius: 100,
                                                backgroundColor: '#fff',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <Octicons name="check-circle-fill" size={65} color="#00d27f" />
                                        </View>
                                    </View>
                                </Animated.View>
                            </View>
                        <Text style={[GlobalStyles.semiBoldText, { color: '#fff', position: 'relative', top: 20, fontSize: 20, width:'60%', textAlign:'center' }]} numberOfLines={2}>{title}</Text>
                        </View>
                    </>
                </Modal >
                :
                <>
                    <View style={{ position: 'relative', backgroundColor: '#fff', width: 85, height: 85, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                        <Animated.View
                            style={{
                                width: 110,
                                height: 110,
                                borderRadius: 50,
                                backgroundColor: '#00d27f66',
                                transform: [{ scale: scaleValue }],
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View
                                style={{
                                    width: 85,
                                    height: 85,
                                    borderRadius: 100,
                                    backgroundColor: '#00d27f80',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <View
                                    style={{
                                        width: 65,
                                        height: 65,
                                        borderRadius: 100,
                                        backgroundColor: '#fff',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Octicons name="check-circle-fill" size={65} color="#00d27f" />
                                </View>
                            </View>
                        </Animated.View>
                    </View>
                    <Text style={[GlobalStyles.semiBoldText, { color: '#fff', position: 'relative', top: 20, fontSize: 20 }]} numberOfLines={1}>{title}</Text>
                </>
            }
        </>
    );
};

export default SuccessAnimation;
