const express = require('express');
const router = express.Router();
var {testing} = require("../controllers/userController")
router.get("/testing",testing)


module.exports = router