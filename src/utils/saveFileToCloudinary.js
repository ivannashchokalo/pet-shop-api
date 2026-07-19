import { Readable } from "node:stream";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function saveFileToCloudinary(buffer, animalId) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "pet-app/animals",
        resource_type: "image",

        public_id: `animal_${animalId}_${Date.now()}`,
        overwrite: true,
        unique_filename: false,

        transformation: [
          {
            width: 1200,
            height: 1200,
            crop: "limit",
          },

          {
            quality: "auto",
          },

          {
            fetch_format: "auto",
          },
        ],
      },

      (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      },
    );
    uploadStream.end(buffer);
  });
}
