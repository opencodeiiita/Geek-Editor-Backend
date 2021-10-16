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
    return res.status(200).json({
        success:true,
        mssg:"Code is added."
        
    })
}
catch (err){
    return res.status(404).json({
        success:false,
        mssg:'Error!!'

    })
  
}


}

// -------UPDATE CODE-------
exports.updateCode = async(req,res) => {
    const _id = req.params.codeId;

    const updates = Object.keys(req.body)
    const allowedUpdates = ["language", "code", "languageCode"]
    const isValid = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })

    if(!isValid){
        return res.status(400).send({error: 'Invalid updates'})
    }

    try {
        const code = await Code.findOne({_id});
        if(!code){
            return res.status(404).json({
                success: false,
                error: 'Code Not Found'
              });
        }

        updates.forEach((update) => {
            code[update] = req.body[update]
        })

        let update = await code.save();
        return res.status(200).json({
        success: true,
        data: update
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Getting Code ${req.params.id}: ${error.message}`
          });
    }
}

// -------DELETE CODE-------
exports.deleteCode = async(req,res) => {
    const _id = req.params.codeId;
    try {
        const code = await Code.findOneAndDelete({_id});
        //code variable stores the deleted code in case we want to send the data back which was deleted
        if(!code){
            return res.status(404).json({
                success: false,
                error: 'Code Not Found'
              });
        }

        return res.status(200).json({
        success: true,
        data: code
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: `Error Deleting Code: ${error.message}`,
          });
    }
}

