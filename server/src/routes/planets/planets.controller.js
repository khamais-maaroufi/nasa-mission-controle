const { getPlanets } = require("../../models/planets.model");

const getAllPlanets = async (req, res) => {
  return res.json(await getPlanets());
};

module.exports = { getAllPlanets };
