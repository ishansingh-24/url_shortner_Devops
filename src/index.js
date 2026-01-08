const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "https://shortifyurlapp.vercel.app",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Routes
app.use("/", routes);

// Health check
app.get("/health", (req, res) => {
  res.send("OK");
});

// Server start
app.listen(PORT, '0.0.0.0', () => {
  console.log("Server running on port 3000");
});
