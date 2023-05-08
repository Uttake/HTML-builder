const path = require("path");
const fsPromises = require("fs/promises");

const folder = path.join(__dirname, "files");
const copyFolder = path.join(__dirname, "files-copy");

createDir();

async function createDir() {
  try {
    await deleteDir();
  } catch {
    console.log("Create copy folder");
  } finally {
    await createCleanDir();
    await copyDir();
  }
}

async function createCleanDir() {
  await fsPromises.mkdir(copyFolder, { recursive: true });
}

async function deleteDir() {
  await fsPromises.rm(copyFolder, { recursive: true });
}

async function copyDir() {
  const basicFiles = await fsPromises.readdir(folder);
  for (let file of basicFiles) {
    await fsPromises.copyFile(
      path.join(__dirname, "files", file),
      path.join(__dirname, "files-copy", file)
    );
  }
}
