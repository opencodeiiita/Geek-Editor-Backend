const express = require("express");
const router = express.Router();
const codeController = require('../controllers/codeController');



router.get('/:codeId',codeController.getCode);
module.exports=router;