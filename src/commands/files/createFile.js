import path from "path";
import fs from "fs";

export const createFile = (fileName) => {
  const filePath = path.join(process.env.CURRENT_DIR, fileName);

  try {
    fs.writeFileSync(filePath, "");

    console.log("File created successfully");
  } catch (error) {
    console.log("Error creating file:", error.message);
  }
}