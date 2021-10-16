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
  forgotPassword,
  resetPassword
} = require("../controllers/authController");
const {
  verifyUser,
} = require("../Middleware/verifyUser");
const {
  ipMiddleware
} = require("../Middleware/ipMiddleware");
/*
ROUTES FOR API ENDPOINTS.
*/

router.route("/profile/:username",ipMiddleware,getProfile);


router.post("/login/",ipMiddleware, login);
// router.post("/devoloperlogin/", login); //devolopers use this to avoid email verification
router.route("/register/").post(addProfile);
// router.route("/devoloperregister/").post(addProfile);
router.post("/update/:id",ipMiddleware,verifyUser,updateUser);
router.delete("/profile/:id",ipMiddleware,verifyUser, deleteUser);
router.get("/profile/:id",ipMiddleware,verifyUser,getUserById);
router.put('/follow/:id',ipMiddleware,verifyUser, followUser);
router.post('/forgotpassword',ipMiddleware,forgotPassword);
const {verifyEmail, sendEmail, sendMailController} = require("../controllers/emailController")
router.get('/verifyEmail/:username/:hashid', verifyEmail)
router.get('/reset/:hashid', function(req,res){ res.send('Password Reset page where we enter the password to be done by frontend') })
router.post('/reset/:hashid',ipMiddleware, resetPassword)
router.post('/sendmail',ipMiddleware, sendMailController)
//router.post('/changePassword/:username/:hashid', forgotPassword)

module.exports = router;
