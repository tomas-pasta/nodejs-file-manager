import path from "path";
import fs from "fs";

export const moveFile = (sourcePath, destinationPath) => {
  const sourceFilePath = path.join(process.env.CURRENT_DIR, sourcePath);

  const destinationFilePath = path.join(process.env.CURRENT_DIR, destinationPath);
  try {
    fs.renameSync(sourceFilePath, destinationFilePath);

    console.log("File moved successfully");
  } catch (error) {
    console.log("Error moving file:", error.message);
  }
}
