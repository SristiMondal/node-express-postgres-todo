const { v4: uuidv4 } = require("uuid");

let arr = [];

const getTodoList = (request, response, next) => {
  response.send({ success: true, data: arr });
};

const getTodoById = (request, response, next) => {
  if (request.params.id) {
    let filteredArr = arr.filter((cur) => cur.id == request.params.id);
    if (filteredArr[0]) {
      response.send({ success: true, data: filteredArr[0] });
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

const addTodoData = (request, response, next) => {
  if (request.body) {
    let obj = request.body;
    obj.id = uuidv4();
    arr.push(obj);
    response.send({ success: true, data: obj });
  } else {
    response.send({ success: false, message: "operation failed" });
  }
};

const updateTodoData = (request, response, next) => {
  const id = request.params.id;
  if (id) {
    arr = arr.filter((cur) => cur.id != id);
    arr.push(request.body);
    response.send({ success: true, data: request.body });
  } else {
    response.send({ success: false, message: "operation failed" });
  }
};

const deleteTodoData = (request, response, next) => {
  let id = request.params.id;
  if (id) {
    arr = arr.filter((cur) => cur.id != id);
    response.send({ success: true, message: "data deleted successfully" });
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
