// Imports
const express = require("express");
const router = express.Router();
const {
  getAllPets,
  getAllPetsByUser,
  getPet,
  createPet,
  updatePet,
  deletePet,
} = require("../controllers/pet");

// Sets up a router for handling HTTP requests related to pets
router.route("/").post(createPet).get(getAllPets);
router.route("/:id").get(getPet).delete(deletePet).patch(updatePet);
router.route("/user/:id").get(getAllPetsByUser);

// Exports router
module.exports = router;
