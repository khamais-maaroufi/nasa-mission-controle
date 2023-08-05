const launch = require("./launches.mongo");
const planet = require("./planets.mongo");
const D_F_N = 0;

async function getLatestFlightNumber() {
  try {
    const lfn = await launch.findOne().sort("-flightNumber");
    if (lfn) {
      return lfn.flightNumber;
    } else {
      return D_F_N;
    }
  } catch (e) {
    console.log(e);
    return;
  }
}

async function getAllLaunches() {
  try {
    const data = await launch.find({}, { _id: 0, __v: 0 });
    return data;
  } catch (e) {
    console.log(e);
    return;
  }
}

async function addNewLaunch(launche) {
  const f = await getLatestFlightNumber();
  const newLaunch = Object.assign(launche, {
    success: true,
    upcoming: true,
    customers: ["ZTM", "NASA"],
    flightNumber: Number(f) + 1,
  });
  try {
    const p = planet.findOne({ kepler_name: newLaunch.destination });
    if (p) {
      const response = await launch.findOneAndUpdate(
        { flightNumber: newLaunch.flightNumber },
        newLaunch,
        {
          upsert: true,
        }
      );
      return response;
    } else {
      throw new Error("no destination planet is matching");
    }
  } catch (e) {
    console.log(e);
    return;
  }
}

async function existLaunchId(id) {
  return await launch.findOne({ flightNumber: id });
}
async function deleteLaunch(id) {
  try {
    const aborted = await launch.updateOne(
      { flightNumber: id },
      {
        upcoming: false,
        success: false,
      }
    );
    return aborted.ok === 1 && aborted.nModified === 1;
  } catch (e) {
    console.log(e);
    return null;
  }
}

// async function getOneLaunch(id) {
//   try {
//     return await launch.findOne({ flightNumber: id });
//   } catch (e) {
//     console.log(e);
//   }
// }

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existLaunchId,
  deleteLaunch,
};
