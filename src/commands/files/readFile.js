import fs from "fs";
import path from "path";

export const readFile = (name) => {
  fs.readFile(path.join(process.env.CURRENT_DIR, name), "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
    }

    console.log("\nFile contains:\n\n", data, '\n');
  });
};