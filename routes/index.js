const express = require("express");
const router = express.Router();

// Welcome Page
router.get("/", (req, res) => res.send("Working"));

// Docs Welcome Page
router.get("/docs", (req, res) => res.render("./docs/index"));

module.exports = router;
