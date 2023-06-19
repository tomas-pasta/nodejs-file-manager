import path from "path";
import fs from "fs";

const zlib = import("zlib");

export const compressFile = (sourcePath, destinationPath) => {
  const sourceFilePath = path.join(process.env.CURRENT_DIR, sourcePath);

  const destinationFilePath = path.join(process.env.CURRENT_DIR, destinationPath);

  try {
    const sourceStream = fs.createReadStream(sourceFilePath);

    const destinationStream = fs.createWriteStream(destinationFilePath + ".br");

    const brotli = zlib.createBrotliCompress();

    sourceStream.pipe(brotli).pipe(destinationStream);

    sourceStream.on("error", (error) => {
      console.log("Error compressing file:", error.message);
    });

    sourceStream.on("end", () => {
      console.log("File compressed successfully");
    });
  } catch (error) {
    console.log("Error compressing file:", error.message);
  }
}
