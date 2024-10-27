const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // To load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

const userRouter = require("./routers/user.route");
const taskRouter = require("./routers/task.route");

// MongoDB Atlas connection URI from environment variable
const uri = process.env.MONGO_URI;

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Allow requests from specific origins with credentials
const allowedOrigins = ['http://localhost:3000']; // Add other origins as needed

// CORS middleware configuration
const corsOptions = {
  origin: allowedOrigins,
  credentials: true, // Allow credentials (cookies, authorization headers)
};

// Apply CORS middleware
app.use(cors(corsOptions));

const db = mongoose.connection;

// Connection event handlers
db.once("open", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// Middleware
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Start Express server
app.listen(port, () => {
  console.log("Server is up on the port: " + port);
});