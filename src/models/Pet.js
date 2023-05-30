const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PetSchema = new Schema({
  image: {
    data: Buffer, // stores the binary image data
    contentType: String, // stores the MIME type of the image
  },
  petName: {
    type: String,
    maxlength: 50,
    minlength: 3,
  },
  petSituation: {
    type: String,
    required: [true, "Please specify whether the pet is lost or found"],
    maxlength: 50,
    minlength: 3,
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
    minlength: 3,
  },
  petColor: {
    type: String,
    maxlength: 50,
    minlength: 3,
  },
  petGender: {
    type: String,
    maxlength: 50,
    minlength: 4,
  },
  petLocation: {
    type: Number,
    required: [true, "Please provide a zipcode"],
    maxlength: 50,
    minlength: 5,
  },
  petDate: {
    type: String,
    required: [true, "Please specify the date on which you lost/found the pet"],
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  contact: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
  },
});

// Defines a pre-save middleware function that fetches the associated user's information based on the pet's userID
PetSchema.pre("save", async function (next) {
  const user = await mongoose.model("User").findById(this.userID);
  if (!user) {
    throw new Error("User not found");
  }

  this.contact = {
    name: user.name,
    phone: user.phone,
    email: user.email,
  };

  next();
});

module.exports = mongoose.model("Pet", PetSchema);
