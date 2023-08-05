const parse = require("csv-parse");
const fs = require("fs");
const planet = require("./planets.mongo");

const isHabitablePlanet = (data) => {
  return (
    data.koi_disposition === "CONFIRMED" &&
    data["koi_insol"] > 0.36 &&
    data["koi_insol"] < 1.11 &&
    data["koi_prad"] < 1.6
  );
};
const HabitablePlanets = [];

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream("kepler_data.csv")
      .pipe(parse({ comment: "#", columns: true }))
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          try {
            await planet.updateOne(
              { kepler_name: data.kepler_name },
              { kepler_name: data.kepler_name },
              {
                upsert: true,
              }
            );
          } catch (err) {
            console.log(err);
          }
        }
      })
      .on("error", (e) => reject(e))
      .on("end", () => {
        resolve();
      });
  });
}

async function getPlanets() {
  return await planet.find({});
}

module.exports = { loadPlanetsData, getPlanets };
