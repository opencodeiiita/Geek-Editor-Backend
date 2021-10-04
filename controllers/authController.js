const User = require("../models/user");
const genPassword = require("../utils/passwordUtils").genPassword;

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

// exports.getUserById = async (req, res, next) => {
//     try {
//         const User = await User.findById(req.params.id);
//         if (!User) {
//             return res.status(404).json( {
//                 success: false,
//                 error: 'User Not Found'
//             })
//         }
//         return res.status(200).json({
//             success: true,
//             data: User
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             error: `Error Getting User ${req.params.id}: ${error.message}`
//         })
//     }
// }

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
    
    const user_with_username = await User.find({username: req.body.username});
    
    if(user_with_username.length){
      return res.status(501).json({
        sucess:false,
        error: "A user with given username exists"
      })
    }
    const user_with_email = await User.find({email: req.body.email}) 
    if(user_with_email.length){
      return res.status(501).json({
        sucess:false,
        error: "A user with given email exists"
      })
    }
    const saltHash = genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

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
    return res.status(500).json({
      success: false,
      error: `Error Adding User: ${error.message}`,
    });
  }
};

exports.login = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
};

// exports.deleteUser = async (req, res, next) => {
//     try {
//         const User = await User.findById(req.params.id);
//         if (!User) {
//             return res.status(404).json( {
//                 success: false,
//                 error: 'User Not Found'
//             })
//         }

//         await   User.remove();

//         return res.status(200).json({
//             success: true,
//             data: {}
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             error: `Error Deleting User: ${error.message}`
//         })
//     }
// }
