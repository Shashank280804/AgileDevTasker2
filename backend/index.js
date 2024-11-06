const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Routers for handling different routes
const userRouter = require("./routers/user.route");
const taskRouter = require("./routers/task.route");

// MongoDB Atlas connection URI from environment variables
const uri = process.env.MONGO_URI;

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// MongoDB connection event handlers
db.once("open", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

// CORS configuration to allow all origins
const corsOptions = {
  origin: "*", // Allow all origins
  credentials: true, // Allow credentials (cookies, authorization headers)
};

// Apply CORS middleware to all routes
app.use(cors(corsOptions));

// Middleware for parsing JSON bodies
app.use(express.json());

// Registering routes
app.use(userRouter);
app.use(taskRouter);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Catch-all route to handle client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
