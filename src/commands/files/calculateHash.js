const crypto = import("crypto");

export const calculateHash = (filePath) => {
  const hash = crypto.createHash("sha256");

  try {
    const fileStream = fs.createReadStream(filePath);

    fileStream.on("data", (chunk) => {
      hash.update(chunk);
    });

    fileStream.on("end", () => {
      const fileHash = hash.digest("hex");
      console.log(`File Hash: ${fileHash}`);
    });

    fileStream.on("error", (error) => {
      console.log("Error calculating hash:", error.message);
    });
  } catch (error) {
    console.log("File not found");
  }
};