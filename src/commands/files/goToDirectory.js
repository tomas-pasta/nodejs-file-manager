import fs from "fs";
import path from "path";
import { printCurrentDirectory } from "../../helpers/printCurrentDirectory.js";

export const goToDirectory = (directory = "") => {
  const newPath = path.resolve(process.env.CURRENT_DIR, directory);

  fs.stat(newPath, (err, stats) => {
    if (err) {
      console.log(err.message);
      return;
    }

    if (stats.isDirectory()) {
      process.env.CURRENT_DIR = newPath;

      printCurrentDirectory();
    } else {
      console.log("Invalid directory");
    }
  });
}
