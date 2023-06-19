import fs from "fs";

export const readFile = (path) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
    }

    console.log("\nFile contains:\n\n", data, '\n');
  });
};