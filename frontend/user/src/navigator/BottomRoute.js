import React from 'react';
import { Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeRoute from './HomeRoute';
import ProfileRoute from './ProfileRoute';
import BookedShowScreen from '../screens/BookedShowScreen';
import WishlistScreen from '../screens/WishlistScreen';
import { useRoute } from '@react-navigation/native';
import GlobalStyles from '../GlobalStyles';
const Tab = createBottomTabNavigator();


const TabRoute = () => {
    
    //routes array
    const routes = [
        {
            path: "HomeScreen",
            name: "Home",
            component: HomeRoute,
            activeIcon:'home',
            inactiveIcon:'home-outline',
            params: null,
        },
        {
            path: "MyShows",
            name:"My Shows",
            component: BookedShowScreen,
            activeIcon:'albums',
            inactiveIcon:'albums-outline',
            params: null,
        },
        {
            path: "Wishlist",
            name: "Wishlist",
            component: WishlistScreen,
            activeIcon:'heart',
            inactiveIcon:'heart-outline',
            params: null,
        },
        {
            path: "Profile",
            name: "Profile",
            component: ProfileRoute,
            activeIcon:'person',
            inactiveIcon:'person-outline',
            params: null,
        },
    ];


    return (
        <Tab.Navigator
            initialRouteName="HomeScreen" 
            screenOptions={{
                activeTintColor: 'blue', 
                inactiveTintColor: 'gray',
                tabBarStyle: {
                    height: 55,
                },
                headerShown: false,
                tabBarHideOnKeyboard: true,
            }}
        >
            {
                routes.map((item) => (
                    <Tab.Screen
                        key={item.path}
                        name={item.path}
                        component={item.component}
                        initialParams={item.params}
                        options={({ }) => ({
                            tabBarLabel: ({ color, focused }) => (
                                <Text
                                    style={[GlobalStyles.normalText,{
                                        color:focused?'#F55139':'#1E1F22',
                                        fontSize: focused ? 14 : 12,
                                        transform: [{ translateY: -5 }],
                                        fontWeight: focused ? "900" : "400",
                                    }]}
                                >
                                    {item.name}
                                </Text>
                            ),
                            tabBarIcon: ({ focused }) => (
                                <View>
                                    {focused ?
                                        <Ionicons name={item.activeIcon} size={20} color="#F55139"></Ionicons> :
                                        <Ionicons name={item.inactiveIcon} size={20} color="#1E1F22"></Ionicons>
                                    }
                                </View>
                            ),
                        })}
                    />
                ))
            }
        </Tab.Navigator>
    )
}

export default TabRoute;
