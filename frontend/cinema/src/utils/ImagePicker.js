import * as ImagePicker from 'expo-image-picker';
import { uploadImage } from './ImageApi';

export const singleImageHandler = async () => {
    try {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log("status: ", status);
        if(status==='granted'){
        const pickedImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: false
        });

        if (!pickedImage.canceled) {
            const response = await fetch(pickedImage.assets[0].uri, { method: 'HEAD' });
            const mimeType = response.headers.get('content-type');
            console.log("mime-type: ", mimeType);
            const uploadResult = await uploadImage(pickedImage.assets[0].uri, mimeType)
            return uploadResult.image;

        }
    }else{
        throw new Error("User denied the permission to access gallery.")
    }
    } catch (err) {
        console.log("Image handling error: ", err);
    }
}