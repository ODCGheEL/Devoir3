const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dmpnbvjj3/image/upload`;
const UPLOAD_PRESET = "hhyxiu0l"; // Replace with your actual unsigned upload preset name

export async function uploadImage(file, folderName) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  if (folderName) {
    formData.append("folder", folderName);
  }

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    // console.log("data delete token", data.delete_token);
    if (response.ok) {
      return { secureUrl: data.secure_url, deleteToken: data.delete_token };
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteCloudinaryImage(deleteToken) {
  const CLOUDINARY_DELETE_URL = `https://api.cloudinary.com/v1_1/dmpnbvjj3/delete_by_token`;

  const formData = new FormData();
  formData.append("token", deleteToken);

  try {
    const response = await fetch(CLOUDINARY_DELETE_URL, {
      method: "POST",
      body: formData,
      skipAuthorization: true,
    });
    const data = await response.json();
    if (response.ok) {
      console.log("image deleted from cloudinary");
      return true;
    } else {
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}
