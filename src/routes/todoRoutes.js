const express = require("express");
const {
  getTodoList,
  addTodoData,
  updateTodoData,
  deleteTodoData,
  getTodoById,
} = require("../controllers/todoController");
const router = express.Router();

router.route("/list").get(getTodoList);
router.route("/:id").get(getTodoById);
router.route("/add").post(addTodoData);
router.route("/update/:id").put(updateTodoData);
router.route("/delete/:id").delete(deleteTodoData);

module.exports = router;
