const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const http = require('http')
const accountsRoutes = require('./routes/accountsRoutes')
const hoursRoutes = require('./routes/hoursRoutes')

const corsOptions = {
    origin: '*',
    credentials: true,
};

const app = express()
app.use(express.json())
app.use(cors())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))


//Routes
app.use('/accounts', accountsRoutes)
app.use('/hours', hoursRoutes)

const server = http.createServer(app)

const port = process.env.PORT || 5000

server.listen(port, ()=> {
    console.log('Listening to port: ', port)
})
