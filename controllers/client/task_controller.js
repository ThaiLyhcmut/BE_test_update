const Task = require("../../models/task.model");

module.exports.index = async (req, res) => {
  const tasks = await Task.find({
    deleted: false
  });

  res.json(tasks);
}

module.exports.detail = async (req, res) => {
  const id = req.params.id;

  const task = await Task.findOne({
    _id: id,
    deleted: false
  });

  res.json(task);
}