const Task = require("../../models/task_model");

module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }
  if(req.query.status) {
    find.status = req.query.status
  }

  const sort = {}
  if(req.query.sortKey && req.query.sortValue){
    sort[req.query.sortKey] = req.query.sortValue
  }

  let limit = 4;
  let page = 1;
  if(req.query.page){
    page = parseInt(req.query.page)
  }
  if(req.query.limit){
    limit = parseInt(req.query.limit)
  }

  if(req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i")
    find.title = regex
  }
  
  const skip = (page - 1)*limit

  console.log(limit, skip)

  const tasks = await Task.find(find).limit(limit).skip(skip).sort(sort);

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

module.exports.changemulti = async (req, res) => {
  const data = req.body
  tasks = await Task.updateMany({
    _id: data.ids
  }, {
    status: data.status
  })
  res.json(tasks)
}

module.exports.createPost = async (req, res) => {
  const data = req.body
  const record = new Task(data)
  await record.save()
  res.json(data)
}

module.exports.editPatch = async (req, res) => {
  const data = req.body
  const id = req.params.id

  const task = await Task.updateOne({
    _id: id
  }, data)

  res.json(task)
}

module.exports.deletemulti = async (req, res) => {
  const data = req.body
  const tasks = await Task.updateMany({
    _id: data.ids
  }, {
    deleted: true
  })
  res.json(tasks)
}