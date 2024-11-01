const express = require('express')
const app = express()
require('dotenv').config()
const database = require("./config/database")
const port = process.env.PORT
const routeClient = require("./routes/client/index_route");
var bodyParser = require('body-parser')
var cors = require('cors')

database.connect(process.env.MONGO_URL)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.use(cors()) // tất cả tên miền được phép truy cập vào
// app.use(cors(corsOptions)) // cho phép tên miền http://example1.com, http://example2.com vào thôi

routeClient(app);

app.listen(port, () => {
  console.log(`website đang chạy localhot: http://localhost:${port}`)
})