const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  getProfile,
  addProfile,
  login,
  updateUser,
  deleteUser,
  getUserById,
  followUser,
  verifyUser,
  forgotPassword,
  resetPassword
} = require("../controllers/authController");
/*
ROUTES FOR API ENDPOINTS.
*/

router.route("/profile/:username").get(getProfile);


router.post("/login/", login);
// router.post("/devoloperlogin/", login); //devolopers use this to avoid email verification
router.route("/register/").post(addProfile);
// router.route("/devoloperregister/").post(addProfile);
router.post("/update/:id",verifyUser,updateUser);
router.delete("/profile/:id",verifyUser, deleteUser);
router.get("/profile/:id",verifyUser,getUserById);
router.put('/follow/:id',verifyUser, followUser);
router.post('/forgotpassword',forgotPassword);

const {verifyEmail, sendEmail} = require("../controllers/emailController")
router.get('/verifyEmail/:username/:hashid', verifyEmail)
router.get('/reset/:hashid', function(req,res){ res.send('Password Reset page where we enter the password to be done by frontend') })
router.post('/reset/:hashid', resetPassword)
router.post('/sendmail',
function(req,res){
 const {link,email,username,message}  = req.body;
 if(!(username && email && link && message)){
   return res.status(400).json({
     success: false,
     error: 'All fields required'
   })
 }
  sendEmail({link,email,username,message})
  })
//router.post('/changePassword/:username/:hashid', forgotPassword)

module.exports = router;
