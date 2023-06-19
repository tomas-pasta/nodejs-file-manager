import fs from "fs";

export const renameFile = (pathFrom, pathTo) => {
  fs.rename(pathFrom, pathTo, (error) => {
    if (error) {
      console.log("Error renaming file:", error.message);
    } else {
      console.log("File renamed successfully");
    }
  });
};
