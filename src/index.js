const express = require("express");
const { connectDB } = require("./config/dbConfig");
const { verifyToken } = require("./middlewares/authHandler");
const { connectRedis } = require("./config/redisConfig");

const app = express();
app.use(express.json());
PORT = process.env.PORT || 8080;

connectDB();

connectRedis();

app.use("/api/todo", verifyToken, require("./routes/todoRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (request, response, next) => {
  response.send({ success: true, message: "This is primary route" });
});

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
