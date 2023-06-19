import path from "path";
import fs from "fs";

export const copyFile = (sourcePath, destinationPath) => {
  const sourceFilePath = path.join(process.env.CURRENT_DIR, sourcePath);
  const destinationFilePath = path.join(process.env.CURRENT_DIR, destinationPath);
  const destinationDir = path.dirname(destinationFilePath);

  // Проверяем наличие файла для копирования
  fs.access(sourceFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`"${sourcePath}" does not exist!`);
      return;
    }

    fs.access(destinationDir, fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdir(path.join(destinationDir, destinationPath), { recursive: true }, (err) => {
          if (err) {
            return console.error(err.message);
          }

          console.log("Directory created successfully!");
        });
      }
    });

    const sourceStream = fs.createReadStream(sourceFilePath);
    const destinationStream = fs.createWriteStream(destinationFilePath);

    sourceStream.on("error", (error) => {
      console.log("Ошибка при копировании файла:", error.message);
      return;
    });

    sourceStream.pipe(destinationStream);

    sourceStream.on("end", () => {
      console.log("Файл успешно скопирован");
    });
  });
};
