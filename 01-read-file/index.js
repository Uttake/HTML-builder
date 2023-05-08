const { error } = require("console");
const fs = require("fs");
const path = require("path");
const { stdout } = process;

const ReadStream = fs.createReadStream(
  path.join(__dirname, "text.txt"),
  "utf-8"
);

ReadStream.on("data", (data) => stdout.write(data));
ReadStream.on("error", (data) => console.log(error));
