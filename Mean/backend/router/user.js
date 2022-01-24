const express = require("express");
// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const UserController = require("../controller/user");


const router = express.Router();

router.post("/signup",UserController.createUser);

router.post("/login", UserController.userLogin);

module.exports = router;
