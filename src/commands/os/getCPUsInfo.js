import os from "os";

export const getCPUsInfo = () => {
  const cpus = os.cpus();

  console.log("CPUs:");

  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}: Model - ${cpu.model}, Clock Rate - ${cpu.speed / 1000} GHz`);
  });
}
