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
  followUser
} = require("../controllers/authController");

/*
ROUTES FOR API ENDPOINTS.
*/

router.route("/profile/:username").get(getProfile);
router.route("/register/").post(addProfile);
router.post("/login/", passport.authenticate("local"), login);
router.post("/update/:id", updateUser);
router.route("/profile/:id").delete(deleteUser);
router.get("/profile/:id", getUserById);
router.put('/follow/:id', followUser);
module.exports = router;
