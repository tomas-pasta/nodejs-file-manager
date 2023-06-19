import fileCommands from "../commands/fileCommands.js";
import osCommands from "../commands/osCommands.js";
import { getAbsolutePath } from "../helpers/getAbsolutePath.js"

export const handleCommand = (command) => {
  const [operation, ...args] = command.split(" ");
  const pathFrom = getAbsolutePath(args[0] || '');
  const pathTo = getAbsolutePath(args[1] || '');

  switch (operation) {
    case "up":
      fileCommands.goUp(); // ✅
      break;
    case "cd":
      fileCommands.goToDirectory(pathFrom); // ✅
      break;
    case "ls":
      fileCommands.getlistFilesAndFolders(); // ✅
      break;
    case "cat":
      fileCommands.readFile(pathFrom); // ✅
      break;
    case "add":
      fileCommands.createFile(pathFrom, args[1]);
      break;
    case "rn":
      fileCommands.renameFile(pathFrom, pathTo);
      break;
    case "cp":
      fileCommands.copyFile(pathFrom, pathTo, args);
      break;
    case "mv":
      fileCommands.moveFile(pathFrom, pathTo);
      break;
    case "rm":
      fileCommands.deleteFile(pathFrom);
      break;
    case "os":
      handleOSCommand(args); // ✅
      break;
    case "hash":
      fileCommands.calculateHash(pathFrom);
      break;
    case "compress":
      fileCommands.compressFile(pathFrom, pathTo);
      break;
    case "decompress":
      fileCommands.decompressFile(pathFrom, pathTo);
      break;
    case ".exit":
      rl.close();
      break;
    default:
      console.log("Invalid input");
      break;
  }
};

export function handleOSCommand(args) { // ✅
  const osCommand = args[0];

  switch (osCommand) {
    case "--EOL":
      osCommands.getEOL();
      break;
    case "--cpus":
      osCommands.getCPUsInfo();
      break;
    case "--homedir":
      osCommands.getHomeDirectory();
      break;
    case "--username":
      osCommands.getCurrentUsername();
      break;
    case "--architecture":
      osCommands.getCPUArchitecture();
      break;
    default:
      console.log("Invalid OS command");
      break;
  }
}
