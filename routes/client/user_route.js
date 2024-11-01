const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user_controller");

router.post("/register", controller.registerPost)

module.exports = router;