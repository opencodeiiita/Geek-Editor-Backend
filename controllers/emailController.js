const {PythonShell} = require('python-shell');
const {secureId} = require('../utils/emailUtils')
const User = require("../models/user");

exports.sendEmail = (link,email,username,message) => {
    PythonShell.run('./python/main.py', {args: [link,email,username,message] }, function (err) {
    if (err) {console.log(err)}
    console.log('finished');
    });
}

exports.verifyEmail = async(req,res) => {
    try{
        const id = req.params.hashid
        const username = req.params.username
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

exports.verifyPassword = async(req,res) => {
    try{
        const id = req.params.hashid
        const user = await User.findOne({'resetToken': req.params.hashid})
        if(!user || user.resetToken !== id){
            return res.status(400).json({
                success : false,
                error: 'Invalid user'
            })
        }
        return res.redirect(`/reset/${id}`)
    }
    catch(err){
        return res.status(400).json({
            success: true,
            message: `some error occured ${err}`
        }) 
    }
}

exports.sendMailController = async(req,res) => {
    try{
    const {link,email,username,message}  = req.body;
    if(!(username && email && link && message)){
    return res.status(400).json({
        success: false,
        error: 'All fields required'
    })
    }
    sendEmail({link,email,username,message})
    return res.status(400).json({
        success: true,
    })
    }
    catch(err){
        return res.status(400).json({
            success: false,
            error: `Some error ${err}`
        })
    }
}