import path from "path";
import fs from "fs";

export const renameFile = (oldPath, newPath) => {
  const oldFilePath = path.join(process.env.CURRENT_DIR, oldPath);

  const newFilePath = path.join(process.env.CURRENT_DIR, newPath);

  try {
    fs.renameSync(oldFilePath, newFilePath);

    console.log("File renamed successfully");
  } catch (error) {
    console.log("Error renaming file:", error.message);
  }
}