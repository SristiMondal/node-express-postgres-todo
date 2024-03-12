const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../config/dbConfig");

const Auth = sequelize.define("Auth", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

(async () => {
  try {
    await Auth.sync({ alter: true });
    console.log("auth model syncronized successfully!!");
  } catch (error) {
    console.log("Error while syncing auth model", error);
  }
})();

module.exports = Auth;
