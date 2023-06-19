import path from "path";
import fs from "fs";
const zlib = import("zlib");

export const decompressFile = (sourcePath, destinationPath) => {
  const sourceFilePath = path.join(process.env.CURRENT_DIR, sourcePath);

  const destinationFilePath = path.join(process.env.CURRENT_DIR, destinationPath);

  try {
    const sourceStream = fs.createReadStream(sourceFilePath);

    const destinationStream = fs.createWriteStream(destinationFilePath.replace(".br", ""));

    const brotli = zlib.createBrotliDecompress();

    sourceStream.pipe(brotli).pipe(destinationStream);

    sourceStream.on("error", (error) => {
      console.log("Error decompressing file:", error.message);
    });

    sourceStream.on("end", () => {
      console.log("File decompressed successfully");
    });
  } catch (error) {
    console.log("Error decompressing file:", error.message);
  }
};
