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

/*{
    "success": true,
    "data": {
        "fname": "dsa",
        "lname": "dsa",
        "username": "dsa",
        "email": "dsa@gmail.com",
        "hash": "fbcac9bed3f8962f5fffded042264a8b7748346406620111e6ba7c67a18b9e5c2721cfb0720c6e532c146292bc585ff9ec7b4002fdd9b7cf5f99f7dd30875c10",
        "salt": "6b425ed52fd5c916a6fa95ea724ca5ec286a20dc3efa603987763e2a2a9f97d5",
        "codes": [],
        "followers": [],
        "following": [],
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRzYSIsImVtYWlsIjoiZHNhQGdtYWlsLmNvbSIsImlhdCI6MTYzNDE5NjMyNywiZXhwIjoxNjM0MjAzNTI3fQ.aThPk26t1ALUfo8bzOQwVYMwZHjDiCgKFDd1KN40vjk",
        "verified": false,
        "verificationToken": "1854121a71c58fcc7b8105559af16f17521c83589eb35f6be4afbc323f3c9abbbb9fb527ccc81bcd380733a2186d3985d867be4b711b8f731def2bc3833004d5",
        "_id": "6167db67df94cff7abc9dba6",
        "createdAt": "2021-10-14T07:25:27.037Z",
        "updatedAt": "2021-10-14T07:25:27.037Z",
        "__v": 0
    },
    "message": "Verify the email via link to activate your account"
}*/