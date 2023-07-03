/**
 * This file defines a Mongoose schema for a pet with various fields and
 * includes a pre-save middleware function for updating contact information
 * based on the associated user.
 */

// Imports dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defines the pet schema
const PetSchema = new Schema({
  // image field stores the binary image data of the pet and its MIME type.
  image: {
    data: Buffer,
    contentType: String,
  },

  // The following fields store various attributes of the pet
  petName: {
    type: String,
    maxlength: 50,
  },
  petSituation: {
    type: String,
    required: [true, "Please specify whether the pet is lost or found"],
    enum: ["lost", "found"],
  },
  animalType: {
    type: String,
    required: [true, "Please specify the animal type"],
    maxlength: 50,
    minlength: 3,
  },
  petBreed: {
    type: String,
    maxlength: 50,
  },
  petColor: {
    type: String,
    maxlength: 50,
  },
  petGender: {
    type: String,
    enum: ["male", "female"],
  },
  petLocation: {
    type: String,
    required: [true, "Please provide a zipcode"],
    maxlength: 50,
    minlength: 5,
  },
  petDate: {
    type: String,
    required: [true, "Please specify the date on which you lost/found the pet"],
  },
  petDescription: {
    type: String,
    maxlength: 50,
  },

  // The userID field stores the ID of the associated user document and references the "User" model
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contact: {
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
  },
});

// Defines a pre-save middleware function that fetches the associated user's information based on the pet's userID
PetSchema.pre("save", async function (next) {
  // Queries the "User" model using the findById method to find the user document with the specified ID
  const user = await mongoose.model("User").findById(this.createdBy.toString());
  console.log(user);
  if (!user) {
    throw new Error("User not found");
  }

  // Updates the contact field of the pet document with the user's name, phone number, and email address
  this.contact = {
    name: user.name,
    phone: user.phone,
    email: user.email,
  };

  console.log(this.contact);

  // The "next" function is called to proceed with the the saving process
  next();
});

// The model is registered with the name "Pet" and is created based on the PetSchema
module.exports = mongoose.model("Pet", PetSchema);
