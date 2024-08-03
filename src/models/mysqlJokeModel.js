const { Sequelize, DataTypes } = require("sequelize");
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

const MySQLJoke = sequelize.define(
  "Joke",
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_moderated: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { timestamps: false }
);

async function initializeTable() {
  try {
    await sequelize.sync({ alter: true });
    console.log("MySQLJoke table created or already exists.");
  } catch (error) {
    console.error("Error creating MySQLJoke table:", error);
  }
}

initializeTable();

module.exports = MySQLJoke;
