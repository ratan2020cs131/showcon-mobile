import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import ScreenWrapper from './ScreenWrapper';
import PosterImages from '../components/movie/PosterImages';
import NewMovieForm from '../components/movie/NewMovieForm';
import { movie, addNewMovie, resetNewMovieState } from '../redux/features/movie/MovieSlice';
import { useDispatch, useSelector } from 'react-redux';
import SubmitModal from '../components/movie/SubmitModal';
import { useEffect, useState } from 'react';
import GlobalStyles from '../GlobalStyles';
import ErrorModal from '../components/ErrorModal';

const NewMovie = ({ navigation }) => {
    const movieState = useSelector(movie);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [error, setError] = useState();
    const onClose = () => setModal(false);
    const onCloseError = () => {
        setError(null);
    }

    const handleSubmit = () => {
        if (!movieState.newMovie.primaryPoster) setError("Add primary poster")
        else if (!movieState.newMovie.title) setError("Add title to proceed")
        else if (!movieState.newMovie.duration[0] || !movieState.newMovie.duration[1]) setError("Add duration of movie")
        else if (!movieState.newMovie.genre?.length > 0) setError("Select atleast one genre")
        else if (!movieState.newMovie.description) setError("Add description")
        else if (!movieState.newMovie.casts.length > 0) setError("Add casts to proceed")
        else if (!movieState.newMovie.release) setError("Select the release date");
        else setModal(true)
    }

    const addMovie = () => {
        dispatch(addNewMovie(movieState.newMovie))
    }

    useEffect(() => {
        if (movieState.isMovieCreated) {
            setTimeout(() => dispatch(resetNewMovieState()), 3100);
        }
    }, [movieState.isMovieCreated])


    return (
        <View style={styles.container}>
            <ScreenWrapper title="Add new movie" />
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true} contentContainerStyle={{ alignItems: 'center' }}>
                <View style={styles.form}>
                    <PosterImages />
                    <NewMovieForm />
                    <TouchableOpacity
                        style={[GlobalStyles.button, { marginTop: 30, width: '100%' }]}
                        onPress={handleSubmit}
                    >
                        <Text style={[GlobalStyles.boldText]}>ADD MOVIE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {modal && <SubmitModal visible={modal} onClose={onClose} onSubmit={addMovie}
                onLoading={movieState.isCreatingNewMovie}
                onSuccess={movieState.isMovieCreated}
                navigation={navigation}
                nav={'HomeScreen'}
            />}
            {error && <ErrorModal visible={error !== null} onClose={onCloseError} error={error} />}
        </View>
    )
}
export default NewMovie;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    form: {
        height: 'fit-content',
        paddingHorizontal: 20,
        alignItems: 'center',
        gap: 20,
        marginVertical: 30,
        maxWidth: 380,
        width: '100%',
    },
})
