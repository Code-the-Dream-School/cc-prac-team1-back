/**
 * This file contains functions for handling different API endpoints related to pets,
 * including retrieving all pets, retrieving pets by user, creating a pet, updating a pet,
 * and deleting a pet, with appropriate error handling.
 */

// Imports dependencies
const Pet = require("../models/Pet");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// Retrieves a list of all pets from the database
const getAllPets = async (req, res) => {
  // Gets all pets from the database using the Pet model's find() method
  const pets = await Pet.find();
  res.status(StatusCodes.OK).json(pets);
};

// Retrieves a list of all pets from the database posted by a specified user
const getAllPetsByUser = async (req, res) => {
  // Extracts the userID from the request parameters (req.params)
  const { userID } = req.params;

  // uses the Pet model's find() method with a query to filter pets based on the createdBy field (assumed to be the user ID)
  const pets = await Pet.find({
    createdBy: userID,
  });

  if (!pets) {
    throw new NotFoundError(`No pets created by user with ID ${userID}`);
  }
  res.status(StatusCodes.OK).json({ pets });
};

// Retrieves a single pet from the database that matches the specified petID
const getPet = async (req, res) => {
  // Extracts the petID from the request parameters (req.params)
  const { petID } = req.params;

  // uses the Pet model's findOne() method with a query to filter the pets based on the _id field matching the specified petID
  const pet = await Pet.findOne({
    _id: petID,
  });

  if (!pet) {
    throw new NotFoundError(`No pet found with ID ${petID}`);
  }
  res.status(StatusCodes.OK).json({ pet });
};

// Creates a new pet in the database using the Pet model
const createPet = async (req, res) => {
  // Extracts the request body (req.body) and assigns it to the body variable.
  const { body } = req;

  // Uses the create() method to create a new pet document in the database based on the provided body
  const pet = await Pet.create(body);

  res.status(StatusCodes.CREATED).json(pet);
};

// Attempts to update a pet in the database using the Pet model and findOneAndUpdate method
const updatePet = async (req, res) => {
  // Extracts the necessary data from the request object
  const {
    body: {
      image,
      petName,
      petSituation,
      animalType,
      petBreed,
      petColor,
      petGender,
      petLocation,
      petDate,
      phone,
      email,
      petDescription,
    },
    user: { userId },
    params: { id: petID },
  } = req;

  // Validation to check for empty fields
  if (
    image === "" ||
    petName === "" ||
    petSituation === "" ||
    animalType === "" ||
    petBreed === "" ||
    petColor === "" ||
    petGender === "" ||
    petLocation === "" ||
    petDate === "" ||
    phone === "" ||
    email === "" ||
    petDescription === ""
  ) {
    throw new BadRequestError("Fields cannot be empty");
  }

  // Update the pet using findOneAndUpdate method
  const pet = await Pet.findOneAndUpdate(
    { _id: petID, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!pet) {
    throw new NotFoundError(`No pet with id ${petID}`);
  }
  res.status(StatusCodes.OK).json({ pet });
};

// Delete a specific pet by ID.
const deletePet = async (req, res) => {
  // Extracts necessary data from the request object
  const {
    user: { userID },
    params: { id: petID },
  } = req;

  // Delete the pet using findOneAndRemove method
  const pet = await Pet.findOneAndRemove({
    _id: petID,
    createdBy: userID,
  });

  if (!pet) {
    throw new NotFoundError(`No pet with id ${petID}`);
  }
  res.status(StatusCodes.OK).json({ msg: "The pet entry has been deleted." });
};

// Exports the various functions defined in the module
module.exports = {
  getAllPets,
  getAllPetsByUser,
  getPet,
  createPet,
  updatePet,
  deletePet,
};
