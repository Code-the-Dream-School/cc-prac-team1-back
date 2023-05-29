const mongoose = require('mongoose')
const Schema = mongoose.Schema


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


module.exports = mongoose.model('User', UserSchema);

