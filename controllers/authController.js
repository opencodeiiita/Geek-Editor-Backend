const User = require("../models/user");
const genPassword = require("../utils/passwordUtils").genPassword;
const validator = require('validator')

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

// ISSUE: get Code ID from usaved user.

// exports.getCode = async (req, res, next) => {
//     try {
//         const code = await Code.find({userID:req.params.username});

//         return res.status(200).json({
//             success: true,
//             data: user
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             error: `Error Getting Users: ${error.message}`
//         })
//     }
// }

exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json( {
                success: false,
                error: 'User Not Found'
            })
        }
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting User ${req.params.id}: ${error.message}`
        })
    }
}

exports.updateUser = async (req, res, next) => {
 
  try {
        const user = await User.findById(req.params.id).exec();
        if (!user) {
            return res.status(404).json( {
                success: false,
                error: 'User Not Found'
            })
        }
        user.set(req.body);
        var update = await user.save();
        return res.status(200).json({
            success: true,
            data: update
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting User ${req.params.id}: ${error.message}`
        })
    }
}

exports.addProfile = async (req, res, next) => {
  try {
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    if(!validator.isEmail(req.body.email)) {
      throw new Error ("Email is invalid")
    }

    const newUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
    });

    // Save user
    await newUser.save();
    return res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (err) {
    console.log("Error occured while registering", err);
    return res.status(400).json({
      success: false,
      error: `Error Adding User: ${err.message}`,
    });
  }
};

exports.login = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
};

//Deleting a user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User Not Found'
      })
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
    })
  }
}
