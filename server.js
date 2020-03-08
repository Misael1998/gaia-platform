const express = require("express");
require("dotenv").config({ path: "./config/config.env" });
const cors = require("cors");
const db = require("./config/db");
const path = require("path");

const server = express();

//init middleware
server.use(express.json({ extended: false }));
server.use(cors());

//route files
const auth = require("./routes/auth");
const user = require("./routes/user");
const order = require("./routes/order");
const data = require("./routes/data");

//mount routes
server.use("/api/auth", auth);
server.use("/api/user", user);
server.use("/api/order", order);
server.use("/api/data", data);

//init database
db();

//@desc     Default temporal route
//@route    GET     /
//@access   Public
if (process.env.NODE_ENV === "development") {
  server.get("/", (req, res) => {
    res.send("gaia-pyflor");
  });
}
// Serve static assets in production
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "sprint"
) {
  // Set static folder
  server.use(express.static("client/build"));

  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//setting port
const PORT = process.env.PORT || 5000;

//expxose port to server to listend
server.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
