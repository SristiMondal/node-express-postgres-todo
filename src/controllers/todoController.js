const { v4: uuidv4 } = require("uuid");
const Task = require("../models/todoModel");

const getTodoList = async (request, response, next) => {
  const list = await Task.findAll();
  response.send({ success: true, data: list });
};

const getTodoById = async (request, response, next) => {
  if (request.params.id) {
    const obj = await Task.findByPk(request.params.id);
    if (obj) {
      response.send({ success: true, data: obj });
    } else {
      response.send({
        success: false,
        message: `No data available with id: ${request.params.id}`,
      });
    }
  } else {
    response.send({ success: false, message: "operation failed" });
  }
};

const addTodoData = async (request, response, next) => {
  if (request.body && request.body.name) {
    let obj = request.body;
    const newTask = await Task.create(obj);
    response.send({ success: true, data: newTask });
  } else {
    response.send({ success: false, message: "operation failed" });
  }
};

const updateTodoData = async (request, response, next) => {
  const id = request.params.id;
  if (id) {
    const obj = await Task.findOne({ where: { id: id } });
    if (obj) {
      const updatedObj = await obj.update(request.body);
      response.send({ success: true, data: updatedObj });
    } else {
      response.send({
        success: true,
        message: `no data available with id : ${id}`,
      });
    }
  } else {
    response.send({ success: false, message: "operation failed" });
  }
};

const deleteTodoData = async (request, response, next) => {
  let id = request.params.id;
  if (id) {
    const obj = await Task.findOne({ where: { id: id } });
    if (obj) {
      await obj.destroy();
      response.send({ success: true, message: "data deleted successfully" });
    } else {
      response.send({
        success: true,
        message: `no data available with id : ${id}`,
      });
    }
  } else {
    response.send({ success: false, message: "operation failed" });
  }
};

module.exports = {
  getTodoList,
  addTodoData,
  updateTodoData,
  deleteTodoData,
  getTodoById,
};
