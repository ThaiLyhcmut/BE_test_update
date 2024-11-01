const tasksRoute = require("./task_route");
const userRoute = require("./user_route")
module.exports = (app) => {

  app.use("/tasks", tasksRoute);
  app.use("/user", userRoute)
}