import cloudinary from "../config/cloudinaryConfig";

export const imageUpload = async (
  img: Express.Multer.File
): Promise<{ url: string; publicId: string }> => {
  const buffer = img.buffer;

  const { secure_url, public_id } = await new Promise<{
    secure_url: string;
    public_id: string;
  }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err) return reject(err);
        resolve(result as { secure_url: string; public_id: string });
      })
      .end(buffer);
  });

  return { url: secure_url, publicId: public_id };
};

export const deleteImage = async (publicId: string): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
