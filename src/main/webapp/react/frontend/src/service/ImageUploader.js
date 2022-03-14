
class ImageUpload { 
    async upload(file) {
        const data = new FormData();    
        data.append("api_key", "922413813298989");
        data.append("upload_preset", "qrmixaxt");
        data.append("timestamp", (Date.now() / 1000) | 0);
        data.append("file", file);

        console.log("file : " + file);

        const result = await fetch(
            'https://api.cloudinary.com/v1_1/zzasik/image/upload',
            {
                method: 'POST',
                body: data,
            },
        );
        console.log(result);
        return await result.json();
    }
}

export default ImageUpload;