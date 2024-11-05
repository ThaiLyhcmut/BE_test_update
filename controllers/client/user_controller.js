const User = require("../../models/user_model")
const md5 = require("md5")
const generateHelper = require("../../helpers/generate_helper")
const ForgotPassword = require("../../models/forgot-password")
const sendMailHelper = require("../../helpers/sendMail_helper")
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

module.exports.loginPost = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    deleted: false
  })
  if(!user){
    res.json({
      "code": "Error",
      "msg": "Email không tồn tại trong hệ thống!"
    })
    return
  }
  if(md5(req.body.password) != user.password) {
    res.json({
      "code": "Error",
      "msg": "Password khong dung"
    })
    return
  }
  res.cookie("tokenUser", user.token);
  res.json({
    "code": "success",
    "token": user.token
  })
}

module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email
  const exisUser = await User.findOne({
    email: email,
    status: "active",
    deleted: false
  })
  if(!exisUser){
    res.json({
      "code": "Error",
      "msg": "Email không tồn tại trong hệ thống!"
    })
    return
  }

  const exisEmail = await ForgotPassword.findOne({
    email: email
  })

  if(exisEmail){
    res.json({
      "code": "Error",
      "msg": "OTP da duoc gui truoc do"
    })
    return
  }
  const otp = generateHelper.generateRandomNumber(6)
  const data = {
    email: email,
    otp: otp
  }
  const record = new ForgotPassword(data)
  await record.save()
  const subject = "Xac thuc ma OTP"
  const text = `Ma xac thuc cua ban la <b>${otp}</b>. Ma OTP co hieu luc trong 3 phut. Vui long khong cung cap ma OTP cho bat ky ai`
  sendMailHelper.sendMail(email, subject, text)
  res.json({
    "code": "Success",
    "msg": "OTP da gui va ton tai trong vong 3 phut"
  })
}

module.exports.otpPasswordPost = async (req, res) => {
  const exisRecord = await ForgotPassword.findOne(req.body)
  if(!exisRecord){
    res.json({
      "code": "Error",
      "msg": "Otp khong chinh xac"
    })
    return
  }
  const user = await User.findOne({
    email: req.body.email
  })
  await ForgotPassword.deleteOne({
    email: req.body.email
  })
  res.cookie("tokenUser", user.token)
  res.json({
    "code": "Success",
    "msg": "OTP chinh xac",
    "token": user.token
  })
}

module.exports.resetPasswordPost = async (req, res) => {
  const token = req.body.token
  await User.updateOne({
    token: token,
    deleted: false
  }, {
    password: md5(req.body.password)
  })
  res.json({
    "code": "Success",
    "msg": "doi mk thanh cong",
  })
}

module.exports.profile = async (req, res) => {
  const token = req.body.token;
  if(!token){
    res.json({
      "code": "Error",
      "msg": "khong tim thay token",
    })
  }
  const user = await User.findOne({
    token: token,
    deleted: false
  }).select("id fullName email")
  if(!user) {
    res.json({
      "code": "Error",
      "msg": "token khong hop le"
    })
  }
  res.json({
    "code": "Success",
    "msg": "thanh cong",
    "user": user
  })
}