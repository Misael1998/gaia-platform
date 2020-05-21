const express = require("express");
const fileupload = require('express-fileupload');
require("dotenv").config({ path: "./config/config.env" });
const cors = require("cors");
const db = require("./config/db");
const path = require("path");

const server = express();

//init middleware
server.use(fileupload());
server.use(express.json({ extended: false }));
server.use(cors());

//route files
const auth = require("./routes/auth");
const user = require("./routes/user");
const order = require("./routes/order");
const data = require("./routes/data");
const request = require("./routes/request");
const employees = require("./routes/employees");
const payment = require("./routes/payment");
const product = require("./routes/product");
const bills = require('./routes/bill');
const provider = require("./routes/provider");

//mount routes
server.use("/api/auth", auth);
server.use("/api/user", user);
server.use("/api/order", order);
server.use("/api/data", data);
server.use("/api/request", request);
server.use("/api/employees", employees);
server.use("/api/payment", payment);
server.use("/api/product", product);
server.use("/api/bills",bills);
server.use("/api/provider", provider);

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