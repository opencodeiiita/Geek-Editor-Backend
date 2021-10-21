const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

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
  tokens: [{
    token:{
        type:String,
    }
}],
  verified: {type: Boolean,default:false},
  verificationToken: {type: String,default: ''},
  resetToken: {type: String, default: ''}
},{ timestamps: true });

UserSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({_id: user._id.toString() }, "secret_key")

  user.tokens = user.tokens.concat({token})
  await user.save()

  return token
}

const User = mongoose.model('User', UserSchema);



module.exports = User;