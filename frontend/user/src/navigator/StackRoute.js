import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/signup/Login';
import Otp from '../screens/signup/Otp';
import Register from '../screens/signup/Register';
import BottomRoute from './BottomRoute';

const Stack = createStackNavigator();

const StackRoute = () => {

    //routes array
    const routes = [
        {
            path:"Login",
            component: Login,
            option : { headerShown:false }
        },
        {
            path:"Otp",
            component: Otp,
            option : { headerShown:false }
        },
        {
            path:"Register",
            component: Register,
            option : { headerShown:false }
        },
        {
            path:"Home",
            component: BottomRoute,
            option : { headerShown:false }
        },
    ];


    return (
        <Stack.Navigator initialRouteName="Login">
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
