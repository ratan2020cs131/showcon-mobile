import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterCinema from '../screens/RegisterCinema';
const Stack = createStackNavigator();

const ProfileRoutes = () => {

    //routes array
    const routes = [
        {
            path: "ProfileScreen",
            component: ProfileScreen,
            option: { headerShown: false }
        },
        {
            path: "RegisterCinema",
            component: RegisterCinema,
            option: { headerShown: false }
        },
    ];


    return (
        <Stack.Navigator initialRouteName={"ProfileScreen"}>
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
