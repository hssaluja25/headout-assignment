const express = require("express");
const fs = require("fs");
const readline = require("readline");
const path = require("path");

const app = express();
const port = 8080;

app.get("/data", (req, res) => {
  const { n, m } = req.query;

  if (!n) {
    // throw error if n is not provided
    return res.status(400).send("Filename is required");
  }

  const filePath = path.join(__dirname, "tmp", "data", `${n}.txt`);

  if (m) {
    const lineNum = parseInt(m);
    if (isNaN(lineNum)) {
      // Throw error if m is invalid
      return res.status(400).send("Line number must be a valid number");
    }

    // this creates an interface for reading data
    // by using the fs.createReadStream stream
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });

    let currentLine = 1;
    let lineFound = false;
    rl.on("line", (line) => {
      if (currentLine === lineNum) {
        // If the line being currently read matches m,
        // return it and close rl
        res.send(line);
        lineFound = true;
        rl.close();
      }
      currentLine++;
    }).on("close", () => {
      if (!lineFound) {
        // If m is bigger than the number of lines in the text file,
        // throw an error
        res.status(404).send("Line number exceeds file length");
      }
    });
  } else {
    // Optimization:
    // Stream the file instead of reading it all at once
    const stream = fs.createReadStream(filePath);
    stream.on("open", () => {
      stream.pipe(res);
    });
    stream.on("error", (err) => {
      res.status(404).send("File not found");
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
