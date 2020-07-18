const express = require("express")
const dotenv = require("dotenv")
const db = require("./db")
const sequelize = require("./db/db")
const studentsRoutes = require('./routes/students')
const projectRoutes = require('./projectroutes/projects')
const students = require('./routes/students/root')
const projects = require('./projectroutes/projects/root')

sequelize.authenticate().then(()=> console.log("Sequelize is working perfectly")).catch((e)=>
console.log(e))

const server = express()
const port = process.env.PORT
server.use(express.json())
server.use('/students' , studentsRoutes) 
server.use('/projects' , projectRoutes)
server.use('/student' , students)
server.use('/project' , projects)
server.listen(port , () => {
    console.log(`Server running ${port}`)
})

