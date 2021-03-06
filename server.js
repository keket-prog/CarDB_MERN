const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");

// Load config from environment variables
dotenv.config({ path: "./config/config.env" });

// Connect to the DB
connectDB();

//Initialise app
const app = express();

// Cross origin resource sharing
app.use(cors());

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Log events
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Routes
app.use("/", require("./controllers/carControllers"));
app.use("/api", require("./controllers/carControllers"));
app.use("/old", require("./controllers/carControllers"));
app.use("/:id", require("./controllers/carControllers"));
app.use("/many", require("./controllers/carControllers"));

// listen to port 3001 or a port specified in process.env
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
