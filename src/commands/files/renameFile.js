import { rename } from "node:fs";
import path from "node:path";

export const renameFile = (pathFrom, newName) => {
  const { dir } = path.parse(pathFrom);

  rename(pathFrom, path.join(dir, newName), (error) => {
    if (error) {
      console.log("Error renaming file:", error.message);
    } else {
      console.log("File renamed successfully");
    }
  });
};
