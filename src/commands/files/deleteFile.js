import path from "node:path";
import { unlink } from "node:fs";

export const deleteFile = async (sourcePath) => {
  const { base } = path.parse(sourcePath);

  unlink(sourcePath, (err) => {
    if (err) {
      console.log(`Failed to delete file ${base}.`);
    }

    console.log(`File ${base} deleted successfully.`);
  });
};
