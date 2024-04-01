import axios from "axios";
import logError from "lib/client/log/logError";
import logResponse from "lib/client/log/logResponse";
export const uploadImages = async (images: any) => {
  // console.log("\x1b[33m\n[lib/public/utils/uploadImages]");
  // upload image to cloudinary
  // console.log("images : ", images);
  let uploadedImages = [];
  for (const item of images) {
    const formData: any = new FormData();
    formData.append("cloud_name", process.env.CLOUDINARY_NAME);
    formData.append("upload_preset", process.env.CLOUDINARY_PRESET);
    formData.append("file", item);
    try {
      // upload
      const response = await axios({
        method: "POST",
        url: process.env.CLOUDINARY_API_BASE_URL,
        data: formData,
      });
      // out
      logResponse(response);
      // console.log({ public_id, secure_url });
      const { public_id, secure_url } = response.data;
      uploadedImages.push({ public_id, secure_url });
    } catch (error) {
      logError(error);
      // console.log("uploadImages error : ", error);
    }
  }
  return uploadedImages;
};
