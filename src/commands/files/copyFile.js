import {
  access, constants, createReadStream, createWriteStream
} from "node:fs";
import path from "path";
import { mkDir } from "./mkDir.js";

export const copyFile = (sourcePath, destinationPath, args) => {
  const { dir, ext } = path.parse(destinationPath);
  const hasExtDestinationPath = ext === '';
  const resolveDirPath = hasExtDestinationPath ? destinationPath : dir;
  const resolveStreamPath = ext === ''
    ? path.join(destinationPath, args[0])
    : destinationPath;

  access(sourcePath, constants.R_OK, (err) => {
    if (err) {
      console.log(`${args[0]} does not exist`);
      return;
    }

    const streamOpen = () => (
      createReadStream(sourcePath).pipe(createWriteStream(resolveStreamPath))
    );

    mkDir(resolveDirPath, streamOpen);
  });
};
