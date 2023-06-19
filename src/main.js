import readline from "readline";
import { stdin as input, stdout as output } from "node:process";
import { handleCommand } from "./utils/input.js";
import { printCurrentDirectory } from "./helpers/printCurrentDirectory.js";
import { userGreeting } from "./helpers/userGreeting.js";

const ROOT_DIR_PATH = "/src";

process.env.USERNAME = process.argv[2]?.split("=")[1] || process.env.USER || "Anonimus";
process.env.CURRENT_DIR = process.cwd() + ROOT_DIR_PATH;

userGreeting();

const rl = readline.createInterface({ input, output });

rl.on("line", (input) => {
  handleCommand(input);
});

rl.on("close", () => {
  console.log(`Thank you for using File Manager, ${process.env.USERNAME}, goodbye!`);
});

printCurrentDirectory();
rl.prompt();
