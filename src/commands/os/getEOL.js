import os from "os";

export const getEOL = () => {
  console.log(`End-of-Line: ${JSON.stringify(os.EOL)}`);
  console.log(`End-of-Line: ${os.EOL}`);
}
