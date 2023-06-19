import fileCommands from "../commands/fileCommands.js";
import osCommands from "../commands/osCommands.js";

export const handleCommand = (command) => {
  const [operation, ...args] = command.split(" ");

  switch (operation) {
    case "up":
      fileCommands.goUp();
      break;
    case "cd":
      fileCommands.goToDirectory(args[0]);
      break;
    case "ls":
      fileCommands.getlistFilesAndFolders();
      break;
    case "cat":
      fileCommands.readFile(args[0]);
      break;
    case "add":
      fileCommands.createFile(args[0]);
      break;
    case "rn":
      fileCommands.renameFile(args[0], args[1]);
      break;
    case "cp":
      fileCommands.copyFile(args[0], args[1]);
      break;
    case "mv":
      fileCommands.moveFile(args[0], args[1]);
      break;
    case "rm":
      fileCommands.deleteFile(args[0]);
      break;
    case "os":
      fileCommands.handleOSCommand(args);
      break;
    // case "hash":
    //   fileCommands.calculateHash(args[0]);
    //   break;
    case "compress":
      fileCommands.compressFile(args[0], args[1]);
      break;
    case "decompress":
      fileCommands.decompressFile(args[0], args[1]);
      break;
    case ".exit":
      rl.close();
      break;
    default:
      console.log("Invalid input");
      break;
  }
};

export function handleOSCommand(args) {
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
