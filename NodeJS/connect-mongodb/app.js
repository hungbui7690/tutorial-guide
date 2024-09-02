/*
  setup mongodb 
  - lấy connectionstring 
  - db/connect.js
  - app.js >> tạo hàm start (tutorial)

////////////////////////////////////////////
  Server
  (1) tạo models/User.js


*/

/////////////////////////////////////////////////////////

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

// DB & AUTHENTICATE
const connectDB = require('./db/connect.js')

/////////////////////////////////////////////////////////

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json('ok')
})

app.post('/api/v1', (req, res) => {
  res.json({ msg: 'ok' })
})

////////////////////////////////////////////////////////////////////
// SERVER
////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
