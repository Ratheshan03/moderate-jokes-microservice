const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const jokeRoutes = require("./routes/jokeRoutes");
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// auth routes
app.use("/api/auth", authRoutes);

// joke routes
app.use("/api/jokes", jokeRoutes);

// Protected routes
app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).send("Access granted");
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
