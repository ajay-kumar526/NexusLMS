const cloudinary = require('cloudinary').v2


exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {
    if (!file?.tempFilePath) {
        throw new Error("Course thumbnail upload was not received");
    }

    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";

    try {
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        if (error.http_code === 403) {
            throw new Error(
                "Cloudinary is rejecting uploads (HTTP 403). Check that uploads are enabled for this Cloudinary account."
            );
        }
        throw error;
    }
}