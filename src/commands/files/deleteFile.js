import path from 'path';
import fs from "fs";

export const deleteFile = (filePath) => {
  const fileToDelete = path.join(process.env.CURRENT_DIR, filePath);

  try {
    fs.unlinkSync(fileToDelete);

    console.log("File deleted successfully");
  } catch (error) {
    console.log("Error deleting file:", error.message);
  }
};
