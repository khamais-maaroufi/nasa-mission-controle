const launches = require("../../models/launches.model");

const getLaunches = async (req, res) => {
  try {
    const data = await launches.getAllLaunches();
    return res.json(data);
  } catch (e) {
    console.log(e);
  }
};
const postLaunch = async (req, res) => {
  try {
    const launch = req.body;

    // console.log(req.body);
    if (
      launch &&
      launch.mission &&
      launch.rocket &&
      launch.launchDate &&
      launch.destination
    ) {
      launch.launchDate = new Date(launch.launchDate);
      if (!isNaN(launch.launchDate)) {
        await launches.addNewLaunch(launch);
        return res.json(launch);
      } else {
        return res.json({
          error: "invalid date format",
        });
      }
    } else {
      return res.json({
        error: "missing launch parameters",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const DeleteLaunch = async (req, res) => {
  const { id } = req.params;
  if (await launches.existLaunchId(Number(id))) {
    const aborted = launches.deleteLaunch(Number(id));
    if (aborted) {
      return res.json({ ok: true });
    } else {
      return res.json({ error: "failed to abort mission" });
    }
  } else {
    return res.json({ error: "id sent didn't match" });
  }
};

module.exports = {
  getLaunches,
  postLaunch,
  DeleteLaunch,
};
