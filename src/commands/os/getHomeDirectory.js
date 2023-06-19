import os from 'os';

export const getHomeDirectory = () => {
  console.log(`Home Directory: ${os.homedir()}`);
}