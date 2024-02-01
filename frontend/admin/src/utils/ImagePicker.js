import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from './ImageApi';

export const singleImageHandler = async () => {
    try {
        const pickedImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection:false
        });

        if (!pickedImage.canceled) {
            const uploadResult = await uploadImage(pickedImage.assets[0].uri)
            return uploadResult.image;
        }
    } catch (err) {
        console.log("Image handling error: ", err);
    }
}