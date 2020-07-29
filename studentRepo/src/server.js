const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const db = require("./db")
const listEndpoints = require('express-list-endpoints')
const sequelize = require("./db/db")
const studentsRoutes = require('./routes/students')
const projectRoutes = require('./projectroutes/projects')
const students = require('./routes/students/root')
const projects = require('./projectroutes/projects/root')

sequelize.authenticate().then(()=> console.log("Sequelize is working perfectly")).catch((e)=>
console.log(e))

const server = express()
const port = process.env.PORT
server.use(cors())
server.use(express.json())
server.use('/students' , studentsRoutes) 
server.use('/projects' , projectRoutes)
server.use('/student' , students)
server.use('/project' , projects)
console.log(listEndpoints(server))
server.listen(port , () => {
    console.log(`Server running ${port}`)
})

