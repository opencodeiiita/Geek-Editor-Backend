const {PythonShell} = require('python-shell');
const {secureId} = require('../utils/emailUtils')
const User = require("../models/user");

exports.sendEmail = (link,email,username) => {
    PythonShell.run('./python/main.py', {args: [link,email,username] }, function (err) {
    if (err) {console.log(err)}
    console.log('finished');
    });
}

exports.verifyEmail = async(req,res) => {
    try{
        const id = req.params.id
        const username = req.params.username
        console.log(username)
        const user = await User.findOne({'username': username})
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid username'
            })
        }
        if(user.verificationToken !== id){
            return res.status(400).json({
                success: false,
                message: 'Invalid link'
            })
        }
        user.verified = true;
        user.verificationToken = '';
        await user.save();
        return res.status(200).json({
            sucess: true,
            message: 'successfully registered'
        })
    }catch (err) {
        console.log("Error occured while registering", err);
        return res.status(400).json({
          success: false,
          error: `Error Adding User: ${err.message}`,
        });
      }

}