import { access, constants, createReadStream, createWriteStream } from "node:fs";
import path from "path";
import { mkDir } from "./mkDir.js";
import { deleteFile } from "./deleteFile.js";

export const copyFile = async (
  sourcePath, destinationPath, args, removeFirstFile = false
) => {
  const { dir, ext } = path.parse(destinationPath);
  const hasExtDestinationPath = ext === "";
  const resolveDirPath = hasExtDestinationPath ? destinationPath : dir;
  const resolveStreamPath = hasExtDestinationPath
    ? path.join(destinationPath, args[0])
    : destinationPath;

  access(sourcePath, constants.R_OK, (err) => {
    if (err) console.log(`${args[0]} does not exist`);
    return;
  });

  const streamOpen = async () => {
    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(resolveStreamPath);

    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
      readStream.close();
      writeStream.close();
    });

    readStream.on('close', () => {
      console.log(`File move to /${args[1]}`);
      removeFirstFile && deleteFile(sourcePath)
    });
  };

  await mkDir(resolveDirPath, streamOpen);
};
