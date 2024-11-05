const User = require("../../models/user_model");

module.exports.requireAuth = async (req, res, next) => {
  
  if(!req.headers.authorization) {
    res.json({
      "code": "error",
      "msg": "Vui long dang nhap vao"
    })
    return
  }
  const token = req.headers.authorization.split(" ")[1]
  const user = await User.findOne({
    token: token,
    deleted: false,
    status: "active"
  });

  if(!user) {
    res.json({
      "code": "error",
      "msg": "Vui long dang nhap vao"
    })
    return
  }
  res.locals.user = user 
  next();
}