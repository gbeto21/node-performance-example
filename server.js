const express = require("express");
const cluster = require("cluster");

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    //event loop is blocked...
  }
}

app.get("/", (req, res) => {
  //Functions that blocks the server:
  // JSON.stringify({})
  // JSON.parse("{}")
  // [5,9,284,829].short()
  res.send(`Performance example ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`Ding ding ding! ${process.pid}`);
});

console.log("Running server.js...");
if (cluster.isMaster) {
  console.log("Master has ben started...");
  cluster.fork();
  cluster.fork();
} else {
  console.log("Worker process started.");
  app.listen(3000);
}
