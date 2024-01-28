import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MoviePage from '../components/movie/Movie';
import NewMovie from '../screens/NewMovieForm';
const Stack = createStackNavigator();


const MovieRoutes = () => {

    //routes array
    const routes = [
        {
            path: "ShowsScreen",
            component: MoviePage,
            option: { headerShown: false }
        },
        {
            path: "NewMovieForm",
            component: NewMovie,
            option: { headerShown: false }
        },
    ];


    return (
        <Stack.Navigator initialRouteName={"ShowsScreen"}>
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

export default MovieRoutes;
