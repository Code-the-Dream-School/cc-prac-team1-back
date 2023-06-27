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
  const { id } = req.params;

  const pets = await Pet.find({ userID: id });

  if (!pets) {
    throw new NotFoundError(`No pets created by user with ID ${id}`);
  }
  res.status(StatusCodes.OK).json({ pets });
};

// Retrieves a single pet from the database that matches the specified petID
const getPet = async (req, res) => {
  // Extracts the petID from the request parameters (req.params)
  const { id } = req.params;

  // uses the Pet model's findOne() method with a query to filter the pets based on the _id field matching the specified petID
  const pet = await Pet.findOne({
    _id: id,
  });

  if (!pet) {
    throw new NotFoundError(`No pet found with ID ${id}`);
  }
  res.status(StatusCodes.OK).json({ pet });
};

// Creates a new pet in the database using the Pet model
const createPet = async (req, res) => {
  // Extracts the request body (req.body) and assigns it to the body variable.
  const { body } = req;

  // Check if a similar pet already exists in the database
  const existingPet = await Pet.findOne({
    petName: body.petName,
    animalType: body.animalType,
    petBreed: body.petBreed,
    petColor: body.petColor,
    petGender: body.petGender,
    petLocation: body.petLocation,
    petDate: body.petDate,
  });

  if (existingPet) {
    // If a similar pet exists, return the existing pet's information to the frontend
    res.status(StatusCodes.OK).json(existingPet);
  } else {
    // If no similar pet exists, create a new pet in the database
    const pet = await Pet.create(body);
    res.status(StatusCodes.CREATED).json(pet);
  }
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
  const pet = await Pet.findOneAndUpdate({ _id: petID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!pet) {
    throw new NotFoundError(`No pet with id ${petID}`);
  }
  res.status(StatusCodes.OK).json({ pet });
};

// Delete a specific pet by ID.
const deletePet = async (req, res) => {
  // Extracts necessary data from the request object
  const {
    params: { id: petID },
  } = req;

  // Delete the pet using findOneAndRemove method
  const pet = await Pet.findOneAndRemove({
    _id: petID,
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
