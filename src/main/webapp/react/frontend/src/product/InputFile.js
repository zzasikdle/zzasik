import { useState } from "react";
import ImageUpload from "../service/ImageUploader";

const InputFile = ({ imageUpload, onLoadFile, onFileChange }) => {

    //const [loading, setLodaing] = useState(false);

    const uploadFile = async(e) => {
        try {
            //setLodaing(true);
            console.log(e.target.files[0]);
            const imageUpload = new ImageUpload();
            const uploaded = await imageUpload.upload(e.target.files[0]);
            console.log("url : "+ uploaded.url);
            onLoadFile(e);
            //setLodaing(false);
            onFileChange({
                url: uploaded.url,
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <input type="file" name="file" accept="image/*, video/*" onChange={uploadFile.bind(this)} />
    )
}

export default InputFile;