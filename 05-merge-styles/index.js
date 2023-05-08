const fs = require("fs");
const path = require("path");
const fsPromises = require("fs/promises");

async function createBundle() {
  const styles = await fsPromises.readdir(path.join(__dirname, "styles"), {
    withFileTypes: true,
  });
  const bundle = fs.createWriteStream(
    path.join(__dirname, "project-dist", "bundle.css")
  );
  for (const file of styles) {
    if (file.isFile() && path.extname(file.name) === ".css") {
      let textFiles = await fsPromises.readFile(
        path.join(__dirname, "styles", file.name),
        "utf-8"
      );
      bundle.write(textFiles + "\n");
    }
  }
}

createBundle();
