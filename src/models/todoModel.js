const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../config/dbConfig");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  name: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
  },
});

(async () => {
  try {
    await Task.sync({ alter: true });
    console.log("task model syncronized successfully!!");
  } catch (error) {
    console.log("Error while syncing task model", error);
  }
})();

module.exports = Task;
