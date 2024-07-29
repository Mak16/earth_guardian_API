const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createUser(req, res) {
  const { uid, email, first_name, last_name, role, photoURL } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        uid,
        email,
        first_name,
        last_name,
        role,
        photoURL,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = {
  createUser,
};
