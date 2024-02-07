import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import Scanner from '../screens/Scanner';
import SearchMovie from '../screens/SearchMovie';
import AddShow from '../screens/AddShow';
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
        },
        {
            path: "SearchMovie",
            component: SearchMovie,
            option: { headerShown: false }
        },
        {
            path: "AddShow",
            component: AddShow,
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
