const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");
const routerVolunteer = require("./src/routes/volunteerRouter");
const routerUser = require("./src/routes/userRouter");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 9000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/volunteer", routerVolunteer);
app.use("/user", routerUser);

app.listen(PORT, () => {
  console.log(`le server est demmaré au Port ${PORT}`);
});
