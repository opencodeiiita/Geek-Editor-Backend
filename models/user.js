const mongoose = require('mongoose');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
        if(!validator.isEmail(value)){
            throw new Error('Email is invalid')
        }
    }
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  codes:{
      type:Array,
      default:[]
  },
  year: {
      type: Date
  }
},{ timestamps: true });


const User = mongoose.model('User', UserSchema);



module.exports = User;