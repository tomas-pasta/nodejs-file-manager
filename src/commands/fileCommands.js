import { goToDirectory } from "./files/goToDirectory.js";
import { goUp } from "./files/goUp.js";
import { getlistFilesAndFolders } from "./files/getlistFilesAndFolders.js";

import { createFile } from "./files/createFile.js";
import { copyFile } from "./files/copyFile.js";
import { moveFile } from "./files/moveFile.js";
import { readFile } from "./files/readFile.js";
import { renameFile } from "./files/renameFile.js";
import { deleteFile } from "./files/deleteFile.js";

import { compressFile } from "./files/compressFile.js";
import { decompressFile } from "./files/decompressFile.js";

import { calculateHash } from "./files/calculateHash.js";

export default {
  calculateHash,
  compressFile,
  copyFile,
  createFile,
  decompressFile,
  deleteFile,
  getlistFilesAndFolders,
  goToDirectory,
  goUp,
  moveFile,
  readFile,
  renameFile,
};
