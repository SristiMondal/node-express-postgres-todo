const bcrypt = require("bcrypt");
const Auth = require("../models/authModel");
const { generateToken } = require("../middlewares/authHandler");

const signup = async (request, response, next) => {
  if (request.body.email && request.body.password) {
    const user = await Auth.findOne({
      where: { email: request.body.email },
    });
    if (user) {
      return response.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(request.body.password, salt);
      const obj = {
        ...request.body,
        password: hashedPassword,
      };
      const newUser = await Auth.create(obj);
      response.send({
        success: true,
        data: newUser,
      });
    }
  } else {
    response.send({ success: false, message: "operation failed" });
  }
};

const login = async (request, response, next) => {
  if (request.body.email && request.body.password) {
    const user = await Auth.findOne({
      where: { email: request.body.email },
    });
    if (user) {
      const isPasswordMatched = await bcrypt.compare(
        request.body.password,
        user.password
      );
      if (isPasswordMatched) {
        const token = await generateToken(user.id);
        return response.status(200).json({
          success: true,
          token: token,
          message: "Logged in successfully",
        });
      } else {
        return response.status(400).json({
          success: false,
          message: "Invalid Password",
        });
      }
    } else {
      return response.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  }
};

const logout = async (request, response, next) => {
  return response.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = {
  signup,
  login,
  logout,
};
