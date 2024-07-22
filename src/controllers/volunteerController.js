const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function allVolunteers(req, res) {
  try {
    const volunteers = await prisma.volunteer.findMany();
    res.status(200).json(volunteers);
  } catch (error) {
    console.error("Error retrieving volunteers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function join(req, res) {
  const { first_name, last_name, email, message } = req.body;

  // Validation des champs vides
  if (!first_name || !last_name || !email) {
    return res
      .status(400)
      .json({ error: "All fields except message are required." });
  }

  try {
    // Vérifier si l'email existe déjà
    const existingVolunteer = await prisma.volunteer.findUnique({
      where: { email },
    });

    if (existingVolunteer) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Créer le nouveau volontaire
    await prisma.volunteer.create({
      data: {
        first_name,
        last_name,
        email,
        message,
      },
    });

    // Récupérer tous les volontaires
    const volunteers = await prisma.volunteer.findMany();

    // Retourner la liste des volontaires
    res.status(201).json(volunteers);
  } catch (error) {
    console.error("Error creating volunteer:", error);
    if (error.code === "P2002" && error.meta.target.includes("email")) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  allVolunteers,
  join,
};
