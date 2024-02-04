import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import Scanner from '../screens/Scanner';
const Stack = createStackNavigator();

const ProfileRoutes = () => {

    //routes array
    const routes = [
        {
            path: "Home",
            component: HomeScreen,
            option: { headerShown: false }
        },
        {
            path: "Scanner",
            component: Scanner,
            option: { headerShown: false }
        }
    ];


    return (
        <Stack.Navigator initialRouteName={"HomeScreen"}>
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

export default ProfileRoutes;
