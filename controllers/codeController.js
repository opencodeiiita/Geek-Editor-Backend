const Code = require('../models/code');
const User = require('../models/user')
exports.getCode = async (req, res) => {
    const codeId = req.params.id;
    try {
        const code = await Code.find({codeId});

        return res.status(200).json({
            success: true,
            data: code
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting Code: ${error.message}`
        })
    }
}

// --- Adding Code -----
exports.addCode = async(req, res)=>{
    try{
    const {userId, code, language, languageCode} = req.body;
    if (!( userId&&code&&language&&languageCode)) {
        return res.status(400).json({
          success: false,
          error: "All input is required"
        });
    }
     
    const newCode = new Code({
        userId:userId,
        code:code,
        language:language,
        languageCode:languageCode
    })
    await newCode.save();
    User.update(
        { _id: userId },
        { $push: { codeId : newCode._id } }
    )
    console.log(newCode);
    return res.status(200).json({
        success:true,
        mssg:"Code is added."
        
    })
}
catch (err){
    console.log(err);
    return res.status(404).json({
        success:false,
        mssg:'Error!!'

    })
  
}


}

