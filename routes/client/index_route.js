const tasksRoute = require("./task.route");

module.exports = (app) => {

  app.use("/tasks", tasksRoute);
  
}