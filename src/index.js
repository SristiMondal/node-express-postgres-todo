const express = require("express");
const { connectDB } = require("./config/dbConfig");

const app = express();
app.use(express.json());
PORT = process.env.PORT || 8080;

connectDB();

app.use("/api/todo", require("./routes/todoRoutes"));

app.get("/", (request, response, next) => {
  response.send({ success: true, message: "This is primary route" });
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
