const path = require("path");
const fsPromises = require("fs/promises");
const { error } = require("console");
const { stdout } = process;

async function GetDir() {
  try {
    const files = await fsPromises.readdir(
      path.join(__dirname, "secret-folder"),
      { withFileTypes: true }
    );
    for (let file of files) {
      if (file.isFile()) {
        let name = path.basename(file.name, path.extname(file.name));
        let ext = path.extname(file.name).slice(1);
        let stats = await fsPromises.stat(
          path.join(__dirname, "secret-folder", file.name)
        );
        let kb = (stats.size / 1024).toFixed(3);
        stdout.write(`${name} - ${ext}  - ${kb}kb \n`);
      }
    }
  } catch {
    console.log(error);
  }
}

GetDir();
