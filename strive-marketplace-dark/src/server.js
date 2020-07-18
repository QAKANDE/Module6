const express = require("express")
const db  = require('./database/index')
const products = require("./routes/products")
const reviews = require("./routes/reviews")
const cart = require("./routes/cart")
const cors = require("cors")
const server = express()
const port = process.env.PORT
server.use(express.json())
server.use('/products' , products)
server.use('/reviews' , reviews)
server.use('/cart' , cart)

server.listen(port , ()=>{
    console.log(`Server running on ${port}`)
})