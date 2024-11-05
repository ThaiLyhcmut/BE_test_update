  const tasksRoute = require("./task_route");
const userRoute = require("./user_route")
const middleware = require("../../middlewares/client/user_middleware")
module.exports = (app) => {

  app.use("/tasks", middleware.requireAuth, tasksRoute);
  app.use("/user", userRoute)
}