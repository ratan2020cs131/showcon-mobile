import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileUpdate from '../components/Profile/ProfileUpdate';

const Stack = createStackNavigator();

const StackRoute = () => {

    const routes = [
        {
            path:"Profile",
            component: ProfileScreen,
            option : { headerShown:false }
        },
        {
            path:"ProfileUpdate",
            component: ProfileUpdate,
            option : { headerShown: false }
        }
    ];


    return (
        <Stack.Navigator initialRouteName="Profile">
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
