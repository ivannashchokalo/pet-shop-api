import { Readable } from "node:stream";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function saveFileToCloudinary(buffer, animalId) {
  // Повертаємо Promise, тому що upload_stream працює через callback
  return new Promise((resolve, reject) => {
    // Створюємо upload stream для відправки файлу
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        // Папка в Cloudinary
        folder: "pet-app/animals",
        resource_type: "image",

        // Унікальна назва файлу
        // Date.now() додає timestamp
        public_id: `animal_${animalId}_${Date.now()}`,
        overwrite: true, // Дозволяє перезапис файлу
        unique_filename: false, // Не генерувати випадкове ім'я

        // Автоматичні оптимізації
        transformation: [
          {
            width: 1200,
            height: 1200,

            // Зменшує тільки великі картинки
            // Маленькі не збільшує
            crop: "limit",
          },

          {
            // Cloudinary автоматично підбирає quality
            quality: "auto",
          },

          {
            // Автоматичний формат:
            // webp / avif / jpg
            // залежно від браузера
            fetch_format: "auto",
          },
        ],
      },

      // Callback після upload
      (err, result) => {
        // Якщо є помилка — reject
        if (err) {
          reject(err);
          return;
        }

        // Якщо успішно — повертаємо результат
        resolve(result);
      },
    );

    // Відправляємо buffer у stream
    uploadStream.end(buffer);
  });
}
