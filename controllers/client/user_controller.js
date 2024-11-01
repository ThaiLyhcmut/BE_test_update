const User = require("../../models/user_model")
const md5 = require("md5")
const generateHelper = require("../../helpers/generate_helper")

module.exports.registerPost = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  })
  if (user){
    res.json({
      "code": "user da ton tai"
    })
    return
  }
  const dataUser = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: md5(req.body.password),
    token: generateHelper.generateRandomString(30),
    status: "active"
  }
  const newUser = new User(dataUser)
  await newUser.save()
  res.cookie("tokenUser", newUser.token);
  res.json({
    "code": "success",
    "token": newUser.token
  })
}