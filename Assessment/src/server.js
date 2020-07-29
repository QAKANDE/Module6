const express = require("express")
const dotenv = require("dotenv")
const db = require("./db")
const routes = require("./routes/index")

const server = express()
const port = process.env.PORT
server.use(express.json())
server.use('/random' , routes)
server.listen(port , () => {
    console.log(`Server running ${port}`)
})