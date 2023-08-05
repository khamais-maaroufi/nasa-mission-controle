require("dotenv").config();
const app = require("./src/app.js");
const http = require("http");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const { loadPlanetsData } = require("./src/models/planets.model");

const server = http.createServer(app);
mongoose.connection.once("open", () => {
  console.log("data base connected successfully");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
async function startServer() {
  try {
    await loadPlanetsData();
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    });
    server.listen(PORT, () => {
      console.log("server is listening on port: " + (PORT || 8000));
    });
  } catch (e) {
    return console.log(e);
  }
}
startServer();
