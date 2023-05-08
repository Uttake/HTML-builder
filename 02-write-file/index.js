const fs = require("fs");
const path = require("path");
const { stdin, stdout, exit } = process;

const WriteStream = fs.createWriteStream(path.join(__dirname, "text.txt"));

stdout.write("Hello, write something\n");

stdin.on("data", (data) => {
  if (data.toString().trim().toLowerCase() === "exit") {
    exit();
  }
  WriteStream.write(data);
});

process.on("exit", (data) => {
  stdout.write("Goodbye!");
});

process.on("SIGINT", exit);
