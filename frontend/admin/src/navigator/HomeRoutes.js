import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ApproveCinema from '../screens/ApproveCinema';
const Stack = createStackNavigator();

const HomeRoutes = () => {

    //routes array
    const routes = [
        {
            path: "Home",
            component: HomeScreen,
            option: { headerShown: false }
        },
        {
            path: "ApproveCinema",
            component: ApproveCinema,
            option: { headerShown: false }
        }
    ];


    return (
        <Stack.Navigator initialRouteName={"Home"}>
            {
                routes.map((item) => (
                    <Stack.Screen
                        key={item.path}
                        name={item.path}
                        component={item.component}
                        options={item.option} />
                ))
            }
        </Stack.Navigator>
    )
}

export default HomeRoutes;
