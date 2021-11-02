const User = require("../models/user");

exports.getImage = async(req,res) => {
    
    try{
        const {token} = req.header
        const user = await User.findOne({'token': token})
        if(!user){
            return res.status(400).json({
                success: false,
                message: "invalid user",
            });
        }
        return res.status(200).json({
            success: true,
            data : user,
        });
    }
    catch(err){
        return res.status(400).json({
            success: false,
            error : err,
        });
    }
}

exports.updateImage = async(req,res) => {
    try{
        const {image} = req.body
        const {token} = req.header
        const user = await User.findOne({'token': token})
        if(!user){
            return res.status(400).json({
                success: false,
                message: "invalid user",
            });
        }
        user.image = image;
        await user.save();
        return res.status(200).json({
            success: true,
            data : user.image,
        });
    }
    catch(err){
        return res.status(400).json({
            success: false,
            error : err,
        });
    }
}