const express = require("express")
const dotenv = require("dotenv")
const db = require("./db")
const studentsRoutes = require('./routes/students')
const projectRoutes = require('./projectroutes/projects')
const server = express()
const port = process.env.PORT
server.use(express.json())
server.use('/students' , studentsRoutes) 
server.use('/projects' , projectRoutes)
server.listen(port , () => {
    console.log(`Server running ${port}`)
})

