import fs from "fs";
import path from "path";
import readline from "readline";
import os from "os";

// TODO: разнести по файлам
// добавить исключения и ошибки
// сделать автотесты для проверки
// заработать доп баллы "Advanced Scope"
// https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/score.md

const USERNAME = process.argv[2]?.split("=")[1] || os.userInfo().username;

console.log(`Welcome to the File Manager, ${USERNAME}!`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let currentDirectory = process.cwd();

function printCurrentDirectory() {
  console.log(`You are currently in ${currentDirectory}`);
}

function listFilesAndFolders() {
  printCurrentDirectory();

  fs.readdir(currentDirectory, { withFileTypes: true }, (err, files) => {
    console.log("Current directory files:");

    if (err) {
      console.log(err.message);
    }

    const list = files.map((file) => {
      const type = file.isDirectory() ? "directory" : "file";

      return [file.name, type];
    });

    // Uncomment if u need print dir's first
    // list.sort((a, b) => a[1].localeCompare(b[1]))

    console.table(list);
  });
}

function goUp() {
  const parentDirectory = path.dirname(currentDirectory);

  if (parentDirectory !== currentDirectory) {
    currentDirectory = parentDirectory;

    printCurrentDirectory();
  }
}

function goToDirectory(directory = "") {
  const newPath = path.resolve(currentDirectory, directory);

  fs.stat(newPath, (err, stats) => {
    if (err) {
      console.log(err.message);
      return;
    }

    if (stats.isDirectory()) {
      currentDirectory = newPath;

      printCurrentDirectory();
    } else {
      console.log("Invalid directory");
    }
  });
}

function readFile(filePath) {
  try {
    const fileStream = fs.createReadStream(filePath, "utf8");

    fileStream.on("data", (chunk) => {
      console.log(chunk);
    });

    fileStream.on("end", () => {
      console.log("File reading complete");
    });

    fileStream.on("error", (error) => {
      console.log("Error reading file:", error.message);
    });
  } catch (error) {
    console.log("File not found");
  }
}

function createFile(fileName) {
  const filePath = path.join(currentDirectory, fileName);

  try {
    fs.writeFileSync(filePath, "");

    console.log("File created successfully");
  } catch (error) {
    console.log("Error creating file:", error.message);
  }
}

function renameFile(oldPath, newPath) {
  const oldFilePath = path.join(currentDirectory, oldPath);

  const newFilePath = path.join(currentDirectory, newPath);

  try {
    fs.renameSync(oldFilePath, newFilePath);

    console.log("File renamed successfully");
  } catch (error) {
    console.log("Error renaming file:", error.message);
  }
}

function copyFile(sourcePath, destinationPath) {
  const sourceFilePath = path.join(currentDirectory, sourcePath);

  const destinationFilePath = path.join(currentDirectory, destinationPath);

  try {
    const sourceStream = fs.createReadStream(sourceFilePath);

    const destinationStream = fs.createWriteStream(destinationFilePath);

    sourceStream.pipe(destinationStream);

    sourceStream.on("error", (error) => {
      console.log("Error copying file:", error.message);
    });

    sourceStream.on("end", () => {
      console.log("File copied successfully");
    });
  } catch (error) {
    console.log("Error copying file:", error.message);
  }
}

function moveFile(sourcePath, destinationPath) {
  const sourceFilePath = path.join(currentDirectory, sourcePath);

  const destinationFilePath = path.join(currentDirectory, destinationPath);
  try {
    fs.renameSync(sourceFilePath, destinationFilePath);

    console.log("File moved successfully");
  } catch (error) {
    console.log("Error moving file:", error.message);
  }
}

function deleteFile(filePath) {
  const fileToDelete = path.join(currentDirectory, filePath);

  try {
    fs.unlinkSync(fileToDelete);

    console.log("File deleted successfully");
  } catch (error) {
    console.log("Error deleting file:", error.message);
  }
}

function getEOL() {
  console.log(`End-of-Line: ${os.EOL}`);
}

function getCPUsInfo() {
  const cpus = os.cpus();

  console.log("CPUs:");

  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}: Model - ${cpu.model}, Clock Rate - ${cpu.speed / 1000} GHz`);
  });
}

function getHomeDirectory() {
  console.log(`Home Directory: ${os.homedir()}`);
}

function getCurrentUsername() {
  console.log(`Current User Name: ${USERNAME}`);
}

function getCPUArchitecture() {
  console.log(`CPU Architecture: ${process.arch}`);
}

function calculateHash(filePath) {
  const crypto = require("crypto");

  const hash = crypto.createHash("sha256");

  try {
    const fileStream = fs.createReadStream(filePath);

    fileStream.on("data", (chunk) => {
      hash.update(chunk);
    });

    fileStream.on("end", () => {
      const fileHash = hash.digest("hex");
      console.log(`File Hash: ${fileHash}`);
    });

    fileStream.on("error", (error) => {
      console.log("Error calculating hash:", error.message);
    });
  } catch (error) {
    console.log("File not found");
  }
}

function compressFile(sourcePath, destinationPath) {
  const sourceFilePath = path.join(currentDirectory, sourcePath);

  const destinationFilePath = path.join(currentDirectory, destinationPath);

  try {
    const sourceStream = fs.createReadStream(sourceFilePath);

    const destinationStream = fs.createWriteStream(destinationFilePath + ".br");

    const zlib = require("zlib");

    const brotli = zlib.createBrotliCompress();

    sourceStream.pipe(brotli).pipe(destinationStream);

    sourceStream.on("error", (error) => {
      console.log("Error compressing file:", error.message);
    });

    sourceStream.on("end", () => {
      console.log("File compressed successfully");
    });
  } catch (error) {
    console.log("Error compressing file:", error.message);
  }
}

function decompressFile(sourcePath, destinationPath) {
  const sourceFilePath = path.join(currentDirectory, sourcePath);

  const destinationFilePath = path.join(currentDirectory, destinationPath);

  try {
    const sourceStream = fs.createReadStream(sourceFilePath);

    const destinationStream = fs.createWriteStream(destinationFilePath.replace(".br", ""));

    const zlib = require("zlib");

    const brotli = zlib.createBrotliDecompress();

    sourceStream.pipe(brotli).pipe(destinationStream);

    sourceStream.on("error", (error) => {
      console.log("Error decompressing file:", error.message);
    });

    sourceStream.on("end", () => {
      console.log("File decompressed successfully");
    });
  } catch (error) {
    console.log("Error decompressing file:", error.message);
  }
}

function handleCommand(command) {
  const [operation, ...args] = command.split(" ");

  switch (operation) {
    case "nwd":
      printCurrentDirectory();
      break;
    case "up":
      goUp();
      break;
    case "cd":
      goToDirectory(args[0]);
      break;
    case "ls":
      listFilesAndFolders();
      break;
    case "cat":
      readFile(args[0]);
      break;
    case "add":
      createFile(args[0]);
      break;
    case "rn":
      renameFile(args[0], args[1]);
      break;
    case "cp":
      copyFile(args[0], args[1]);
      break;
    case "mv":
      moveFile(args[0], args[1]);
      break;
    case "rm":
      deleteFile(args[0]);
      break;
    case "os":
      handleOSCommand(args);
      break;
    case "hash":
      calculateHash(args[0]);
      break;
    case "compress":
      compressFile(args[0], args[1]);
      break;
    case "decompress":
      decompressFile(args[0], args[1]);
      break;
    case "clear":
      console.clear();
      break;
    case ".exit":
      rl.close();
      break;
    default:
      console.log("Invalid input");
      break;
  }
}

function handleOSCommand(args) {
  const osCommand = args[0];

  switch (osCommand) {
    case "--EOL":
      getEOL();
      break;
    case "--cpus":
      getCPUsInfo();
      break;
    case "--homedir":
      getHomeDirectory();
      break;
    case "--username":
      getCurrentUsername();
      break;
    case "--architecture":
      getCPUArchitecture();
      break;
    default:
      console.log("Invalid OS command");
      break;
  }
}

rl.on("line", (input) => {
  handleCommand(input);
});

rl.on("close", () => {
  console.log(`Thank you for using File Manager, ${USERNAME}, goodbye!`);
});

printCurrentDirectory();
rl.prompt();
