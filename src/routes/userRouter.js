const express = require("express");
const { createUser } = require("../controllers/userController");

const routerUser = express.Router();
routerUser.post("/", createUser);

module.exports = routerUser;