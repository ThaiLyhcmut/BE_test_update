const express = require('express')
const app = express()
require('dotenv').config()
const database = require("./config/database")
const port = process.env.PORT
const routeClient = require("./routes/client/index.route");

database.connect(process.env.MONGO_URL)

routeClient(app);

app.listen(port, () => {
  console.log(`website đang chạy localhot: http://localhost:${port}`)
})