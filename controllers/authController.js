const User = require("../models/user");
const genPassword = require("../utils/passwordUtils").genPassword;
const validator = require('validator');
const { ObjectId } = require('mongodb');
const jwt = require("jsonwebtoken");
const validPassword = require("../utils/passwordUtils").validPassword;
const {sendEmail} = require("./emailController")
const {secureId} = require('../utils/emailUtils')
const {addIp} = require("../utils/DDOS")
const requestIp = require('request-ip');
 



// -------GET PROFILE-------
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.find({ username: req.params.username });
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error Getting Users: ${error.message}`,
    });
  }
};


// -------ADD PROFILE-------
exports.addProfile = async (req, res, next) => {
  try {
    
    const {email,password,fname,lname,username} = req.body

    if (!(email && password && fname && lname && username)) {
      return res.status(400).json({
        success: false,
        error: "All input is required"
      });
    }

    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const secureToken = secureId();

    if (!validator.isEmail(req.body.email)) {
      throw new Error("Email is invalid");
    }
    const token = jwt.sign(
      { username: req.body.username, email:req.body.email },
       'secret_key',
      {
        expiresIn: "2h",
      }
    );
    const newUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      token: token,
      verificationToken: secureToken
    });

    const link = `http://localhost:8000/verifyEmail/${username}/${secureToken}`
    
    /* -------Save Profile------- */
    // DO NOT DELETE IT
    // TO BE USED AFTER DEVOLOPMENT
    //sendEmail(link,email,username,'Verify email')
    
    await newUser.save();

    return res.status(201).json({
      success: true,
      data: newUser,
      message: 'Verify the email via link to activate your account'
    });
  } catch (err) {
    console.log("Error occured while registering", err);
    return res.status(400).json({
      success: false,
      error: `Error Adding User: ${err.message}`,
    });
  }
};


// -------LOGIN-------
exports.login = async (req, res, next) => {

    try {
      const { email, password } = req.body;
      
      if (!(email && password)) {
        res.status(400).json({
          success: false,
          error: "All input is required"});
      }
      const user = await User.findOne({email: email});
    // DO NOT DELETE IT
    // TO BE USED AFTER DEVOLOPMENT
    // if(req.originalUrl !== '/devoloperLogin/'){
    //   if(!(user.verified)){
    //     return res.json({
    //       success: false,
    //       error: "Verify your email first"
    //     })
    //   }
    // }
  
      if (user && (await validPassword(password,user.hash, user.salt))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          "secret_key",
          {
            expiresIn: "2h",
          }
        );
          user.token = token;
          
        return res.status(200).json({
          success: true,
          data:user });
      }
      return res.status(400).json({
        success: false,
        error: `Invalid credentials`,
      });
    } catch (err) {
        return res.status(500).json({
        success: false,
        error: `Error loging in : ${err.message}`,
      });    
  }
};


// -------UPDATE USER-------
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).exec();
    
    const token = req.header('Authorization').replace('Bearer ','')
    if(user.token !== token){
      return res.status(404).json({
        success: false,
        error: 'U cannot update other users profile'
      });
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User Not Found'
      });
    }

    user.set(req.body);
    var update = await user.save();
    return res.status(200).json({
      success: true,
      data: update
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error Getting User ${req.params.id}: ${error.message}`
    });
  }
};


//-------DELETE USER-------
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const token = req.header('Authorization').replace('Bearer ','')
    if(user.token !== token){
      return res.status(404).json({
        success: false,
        error: 'U cannot delete other users profile'
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User Not Found'
      });
    }

    await user.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error Deleting User: ${error.message}`,
    });
  }
};


// -------GET USER BY ID-------
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User Not Found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Error Getting User ${req.params.id}: ${error.message}`
    });
  }
};


//-------FOLLOW USER-------
exports.followUser = async (req, res, next) => {
  const _id = req.params.id;
  try {
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ success: false, error: `Invalid User Id provided` });
    }
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User Not Found'
      });
    }

    const updatedUser1Res = await User.updateOne({ _id: ObjectId(req.user._id) }, { $addToSet: { following: [ObjectId(_id)] } });
    const updatedUser2Res = await User.updateOne({ _id: ObjectId(_id) }, { $addToSet: { followers: [ObjectId(req.user._id)] } });
    res.status(200).json({ success: true, mesg: 'User followed' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: `Error Following User: ${error.message}`,
    });
  }
};

exports.forgotPassword = async(req,res) => {
  try{
    const {username} = req.body
    const user = await User.findOne({'username': username})
    if(!user){
      return res.status(400).json({
        success: false,
        error: 'Invalid user'
      })
    }
    const hashid = secureId()
    user.resetToken  = hashid
    await user.save();
    const link =`http://localhost:8000/reset/${hashid}`
    sendEmail(link,user.email,username,'Password reset')
    return res.status(200).json({
      sucess: true,
    })
  }
  catch(err){
    return res.status(400).json({
      success: false,
      error: `some error occured ${err}`
    })

  }
  
}

exports.resetPassword = async(req,res) => {
  try{
    const {password} = req.body
    const user = await User.findOne({'resetToken': req.params.hashid})
    if(!user){
      return res.status(400).json({
        success: false,
        error: 'Invalid user'
      })
    }
    if(!password){
      return res.status(400).json({
        success: false,
        error: 'New password required'
      })
    }
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    user.salt = salt;
    user.hash = hash;
    user.resetToken = '';
    await user.save()
    return res.status(200).json({
      sucess: true,
      message: 'Successfully changed password'
    })
  }
  catch(err){
    return res.status(400).json({
      success: false,
      error: `some error occured ${err}`
    })
  }
  
}
