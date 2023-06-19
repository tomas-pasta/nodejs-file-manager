import path from "path";
import { printCurrentDirectory } from "../../helpers/printCurrentDirectory.js";

export const goUp = () => {
  const parentDirectory = path.dirname(process.env.CURRENT_DIR);

  if (parentDirectory !== process.env.CURRENT_DIR) {
    process.env.CURRENT_DIR = parentDirectory;

    printCurrentDirectory();
  }
};
