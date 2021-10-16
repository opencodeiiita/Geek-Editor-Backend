const express = require("express");
const router = express.Router();
const codeController = require('../controllers/codeController');



router.get('/:codeId', codeController.getCode);
router.post('/submitCode', codeController.addCode);
router.patch('/updateCode/:codeId', codeController.updateCode);
router.delete('/deleteCode/:codeId', codeController.deleteCode);

module.exports = router;
