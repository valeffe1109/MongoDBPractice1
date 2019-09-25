const express = require('express')
const bodyParser = require('body-parser')
const studentsRouter= require('./services/students')
const cors = require('cors')
const server = express()
server.set('port', process.env.PORT||3450)
server.use(bodyParser.json())
server.use('/students',studentsRouter)


server.use(cors())


server.listen(server.get('port'),() => {

    console.log('Server is running on ' + server.get('port'))
})
