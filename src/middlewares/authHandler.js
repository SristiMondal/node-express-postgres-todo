const jwt = require("jsonwebtoken");

const crypto = require("crypto");
const { redisClient } = require("../config/redisConfig");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const secretKey = await redisClient.get(token);
    if (secretKey) {
      jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
          res.status(401).send({
            success: false,
            message: "Invalid Token",
          });
        } else {
          req.userId = decoded.userId;
          next();
        }
      });
    }
  } else {
    res.status(401).send({
      success: false,
      message: "Invalid Token",
    });
  }
};

const generateToken = async (userId) => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1m" });
  await redisClient.set(token, secretKey);
  return token;
};

module.exports = { verifyToken, generateToken };
