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
  verifyUser
} = require("../controllers/authController");

/*
ROUTES FOR API ENDPOINTS.
*/

router.route("/profile/:username").get(getProfile);


router.post("/login/", login);
router.route("/register/").post(addProfile);
router.post("/update/:id",verifyUser,updateUser);
router.delete("/profile/:id",verifyUser, deleteUser);
router.get("/profile/:id",verifyUser,getUserById);
router.put('/follow/:id',verifyUser, followUser);

const {verifyEmail} = require("../controllers/emailController")

router.get('/verifyEmail/:username/:id', verifyEmail)
module.exports = router;
