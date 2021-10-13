const mongoose = require('mongoose');

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
    unique: true
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
      type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Code',
            required:true,
        }],
      default:[]
  },
  year: {
      type: Date
  },
  followers: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }],
    default: []
  },
  following: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }],
    default: []
  },
  token: { type: String },
},{ timestamps: true });


const User = mongoose.model('User', UserSchema);



module.exports = User;