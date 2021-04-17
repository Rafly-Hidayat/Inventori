// Import NPM
const express = require('express')
const cors = require('cors')

// Import file
const con = require('./config/db')

const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

// connecting route to database
app.use(function(req, res, next) {
    req.con = con
    next()
  })

// include router
const dataRouter = require('./routes/dataRouter')
// use router
app.use(dataRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
})