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

/**
 *
 *
 * Add your routes for your API endpoints here. Don't forget to add your  controller!
 */

router.route("/profile/:username").get(getProfile);
// .post(addProfile)
// .put()
// .delete()

// router
//     .route('/register')
//     .post

router.post("/login/", login);
router.route("/register/").post(addProfile);
router.post("/update/:id",verifyUser,updateUser);
router.delete("/profile/:id",verifyUser, deleteUser);
router.get("/profile/:id",verifyUser,getUserById);
router.put('/follow/:id',verifyUser, followUser);
module.exports = router;
