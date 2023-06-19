import fs from "fs";
import { printCurrentDirectory } from "../../helpers/printCurrentDirectory.js";

export const goToDirectory = (path) => {
  fs.stat(path, (err, stats) => {
    if (err) {
      console.log(err.message);
      return;
    }

    if (stats.isDirectory()) {
      process.env.CURRENT_DIR = path;

      printCurrentDirectory();
    } else {
      console.log("Invalid directory");
    }
  });
}
