const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  getProfile,
  addProfile,
  login,
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

router.post("/login/", passport.authenticate("local"), login);

router.route("/register/").post(addProfile);

module.exports = router;
