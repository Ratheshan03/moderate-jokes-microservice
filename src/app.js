const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jokeRoutes = require("./routes/jokeRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const app = express();

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jokes API",
      version: "1.0.0",
      description: "API documentation for the Jokes Microservice",
    },
    servers: [
      {
        url: "http://localhost:3002",
      },
    ],
    components: {
      schemas: {
        Joke: {
          type: "object",
          properties: {
            content: {
              type: "string",
              description: "The joke content",
            },
            type: {
              type: "string",
              description: "The joke category/type",
            },
            is_moderated: {
              type: "boolean",
              description: "Whether the joke is moderated",
              default: true,
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js", "./controllers/*.js"],
};

const swaggerDocs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Connect to MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL");

    // Ensure MySQLJoke table is created or already exists
    const MySQLJoke = require("./models/mysqlJokeModel");
    sequelize.sync({ alter: true }).then(() => {
      console.log("MySQLJoke table is ready");
    });
  })
  .catch((error) => console.error("MySQL connection error:", error));

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3003",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-access-token"],
  })
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/jokes", jokeRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.status(200).send("Access granted");
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
