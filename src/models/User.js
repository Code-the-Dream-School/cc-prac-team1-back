const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const UserSchema = new Schema({  name: {
    type: String,
    required: [true, ' Please provide name'],

    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true,'Please provide password'],
    minlength: 8,
  },
  phone : {
    type: Number,
    required: [true, "Please provide phone number"],
    match: [
        /^[\.-)( ]*([0-9]{3})[\.-)( ]*([0-9]{3})[\.-)( ]*([0-9]{4})$/
    ]  
},
})

UserSchema.pre('save', async function(next) {
    const user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt)
next()

});


UserSchema.methods.createJWT = function () {
  return jwt.sign({userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}


module.exports = mongoose.model('User', UserSchema);

