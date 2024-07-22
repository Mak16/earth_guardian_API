const express = require("express");
const { join, allVolunteers } = require("../controllers/volunteerController");

const routerVolunteer = express.Router();
routerVolunteer.post("/", join);
routerVolunteer.get("/", allVolunteers);

module.exports = routerVolunteer;
