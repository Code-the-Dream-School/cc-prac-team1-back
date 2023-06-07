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
router
  .route("/:id")
  .get(getPet)
  .get(getAllPetsByUser)
  .delete(deletePet)
  .patch(updatePet);

// Exports router
module.exports = router;
