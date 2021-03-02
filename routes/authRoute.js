const express = require('express');
const router = express.Router();
var {userValidation} = require("../middleware/userValidation")
var {signup,signin} = require("../controllers/authController")
router.post("/signup",userValidation, signup)
router.post("/signin", signin)

module.exports = router