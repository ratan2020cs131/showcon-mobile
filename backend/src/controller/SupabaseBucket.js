import { createClient } from '@supabase/supabase-js'
import Image from '../database/models/Image.js'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABSE_API;
const supabase = createClient(supabaseUrl, supabaseKey);

const imageUpload = async (req, res) => {
    try {
        if (!req.file) throw new Error("No file attached");

        //check if image is less than 5 MB
        if (req.file.size > 5 * 1024 * 1024) {
            res.send({ message: "File should be less than 5MB", code: 11 })
        }

        //check if the file is an image
        else if (!req.file.mimetype.startsWith("image/")) {
            res.json({ message: "Only image files are allowed", code: 12 });
        }

        else {
            const timestamp = new Date().getTime();
            const fileName = `${req.file.originalname}-${timestamp}`;

            const { data, error } = await supabase.storage
                .from('showcon') // bucket name
                .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

            if (error) {
                return res.status(500).json({ error: 'Failed to upload file to Supabase' });
            } else {
                const imageUrl = supabase.storage
                    .from('showcon') // bucket name
                    .getPublicUrl(data.path);

                // //save the url and file path in mongodb
                const image = new Image({ filePath: fileName, url: imageUrl.data.publicUrl });
                await image.save();

                res.send({ "image": imageUrl.data.publicUrl, code: 0 });
            }

        }
    } catch (err) {
        console.log("Image upload error: ", err.message);
        res.status(500).send({ message: err.message })
    }
}

const imageDelete = async (req, res) => {
    try {
        const url = req.body.url;
        if (!url) throw new Error("Provide file URL");
        const image = await Image.findOne({ url });
        if (image) {
            const filePath = image.filePath;

            const { data, error } = await supabase.storage
                .from('showcon') // bucket name
                .remove([filePath]);

            if (error) {
                console.log(error);
                res.status(500).send({ message: "Image deletion failed" })
            }
            else {
                const deleted = await Image.findOneAndDelete(image);
                res.send({ message: `Successfully deleted file: ${data[0].name}` })
            }
        } else {
            res.send({ message: "Image already has been deleted" })
        }

    } catch (err) {
        console.log("Image delete error: ", err.message);
        res.status(500).send({ message: err.message })
    }
}


export default {
    imageUpload,
    imageDelete
}
