const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

exports.cloudinaryConnect = () => {
	try {
		const requiredValues = ["CLOUD_NAME", "API_KEY", "API_SECRET"];
		const missingValue = requiredValues.find(
			(value) => !process.env[value]?.trim()
		);
		if (missingValue) {
			throw new Error(`${missingValue} is not configured`);
		}

		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME.trim(),
			api_key: process.env.API_KEY.trim(),
			api_secret: process.env.API_SECRET.trim(),
		});
	} catch (error) {
		console.error("Cloudinary configuration failed:", error.message);
		throw error;
	}
};