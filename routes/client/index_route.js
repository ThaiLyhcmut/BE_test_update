const tasksRoute = require("./task_route");

module.exports = (app) => {

  app.use("/tasks", tasksRoute);
  
}