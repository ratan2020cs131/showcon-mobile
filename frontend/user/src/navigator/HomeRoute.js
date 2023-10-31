import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Show from '../screens/show/Show';
import HomeScreen from '../screens/HomeScreen';
import SeatScreen from '../screens/show/Seat';

const Stack = createStackNavigator();

const StackRoute = () => {

    const routes = [
        {
            path:"Home",
            component: HomeScreen,
            option : { headerShown:false }
        },
        {
            path:"ShowScreen",
            component: Show,
            option : { headerShown:false }
        },
        {
            path:"SeatScreen",
            component: SeatScreen,
            option : { headerShown:false }
        },
    ];


    return (
        <Stack.Navigator initialRouteName="Home">
            {
                routes.map((item)=>(
                    <Stack.Screen 
                    key={item.path}
                    name={item.path} 
                    component={item.component}
                    options={item.option}/>
                ))
            }
        </Stack.Navigator>
    )
}

export default StackRoute;
