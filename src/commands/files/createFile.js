import path from "node:path";
import { writeFile } from "node:fs";

export const createFile = (filePath, content = "") => {
  const fileNmae = path.basename(filePath);

  writeFile(filePath, content, (err) => {
    if (err) {
      console.error(err);
    }

    console.log(`File ${fileNmae} created!`);
  });
}