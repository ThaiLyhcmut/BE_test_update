const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user_controller");
router.get("/profile", controller.profile)
router.post("/register", controller.registerPost)
router.post("/login", controller.loginPost)
router.post("/password/forgot", controller.forgotPasswordPost)
router.post("/password/otp", controller.otpPasswordPost)
router.post("/password/reset", controller.resetPasswordPost)
module.exports = router;