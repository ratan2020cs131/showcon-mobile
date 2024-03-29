import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

const getLocation = async () => {
    try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error("Location permission denied")
        }
        const location = await getCurrentPositionAsync({});
        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
    } catch (error) {
        console.log(`Error getting location: ${error.message}`);
    }
}
export default getLocation;