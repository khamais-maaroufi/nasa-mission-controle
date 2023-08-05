const express = require("express");
const {
  getLaunches,
  postLaunch,
  DeleteLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", getLaunches);
launchesRouter.post("/", postLaunch);
launchesRouter.delete("/:id", DeleteLaunch);

module.exports = launchesRouter;
