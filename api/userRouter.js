const express = require("express");
const { login, 
    addProfile, 
    logoutUser, 
    deleteUser, 
    updateUser, 
    followUser, 
    getUserById, 
    forgotPassword, 
    resetPassword, 
    codesOfUser, 
    languagesOfUser, 
    verifyRefreshToken, 
    verifyAuthToken} = require("../controllers/authController");
const router = express.Router();
const {verifyEmail, sendEmail, sendMailController} = require("../controllers/emailController");
const { getImage, updateImage } = require("../controllers/imageControllers");
const { ipMiddleware } = require("../Middleware/ipMiddleware");
const { verifyUser } = require("../Middleware/verifyUser");

router.post("/login/",ipMiddleware, login);
// router.post("/devoloperlogin/", login); //devolopers use this to avoid email verification
router.route("/register/").post(addProfile);
// router.route("/devoloperregister/").post(addProfile);
router.post("/logout",verifyUser,logoutUser);
router.post("/update/:id",ipMiddleware,verifyUser,updateUser);
router.delete("/profile/:id",ipMiddleware,verifyUser, deleteUser);
router.get("/profile/:id",ipMiddleware,getUserById);
router.put('/follow/:id',ipMiddleware,verifyUser, followUser);
router.post('/forgotpassword',ipMiddleware,forgotPassword);
router.get('/verifyEmail/:username/:hashid', verifyEmail)
router.get('/reset/:hashid', function(req,res){ res.send('Password Reset page where we enter the password to be done by frontend') })
router.post('/reset/:hashid',ipMiddleware, resetPassword)
router.post('/sendmail',ipMiddleware, sendMailController)
//router.post('/changePassword/:username/:hashid', forgotPassword)
router.get('/codes/:id',ipMiddleware, codesOfUser);
router.get('/languages/:id',ipMiddleware, languagesOfUser);
router.post('/refresh-token', verifyRefreshToken)
router.post('/verify-auth-token', verifyAuthToken)
router.post('/image', getImage)
router.put('/image', updateImage)
module.exports = router;