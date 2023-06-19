import fs from "fs";
import { printCurrentDirectory } from "../../helpers/printCurrentDirectory.js";

export const getlistFilesAndFolders = () => {
  printCurrentDirectory();

  fs.readdir(process.env.CURRENT_DIR, { withFileTypes: true }, (err, files) => {
    console.log("Current directory files:");

    if (err) {
      console.log(err.message);
    }

    const list = files.map((file) => {
      const type = file.isDirectory() ? "directory" : "file";

      return [file.name, type];
    });

    list.sort((a, b) => a[1].localeCompare(b[1]))

    console.table(list);
  });
};