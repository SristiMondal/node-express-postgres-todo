const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres", //database
  "postgres", //username (default ~ postgres)
  "root", //password
  {
    host: "localhost", //host
    port: "5432", //host port
    dialect: "postgres", //communication bridge
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to DB");
  } catch (error) {
    console.log("Unable to connect to DB due to error :", error);
  }
};

module.exports = { sequelize, connectDB };
