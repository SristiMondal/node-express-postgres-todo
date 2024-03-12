const express = require("express");
const { signup, login, logout } = require("../controllers/authController");
const router = express.Router();

router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/signup").post(signup);

module.exports = router;
