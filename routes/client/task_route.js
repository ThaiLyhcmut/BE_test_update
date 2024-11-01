const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/task_controller");

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/changemulti", controller.changemulti)

router.patch("/edit/:id", controller.editPatch)

router.patch("/deletemulti", controller.deletemulti)

router.post("/create", controller.createPost)


module.exports = router;