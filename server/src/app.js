const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");
const cluster = require("cluster");

app.use(cors());
app.use(morgan("short"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(planetsRouter);
app.use("/launches", launchesRouter);
app.use("/*", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
module.exports = app;
