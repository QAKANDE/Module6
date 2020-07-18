const express = require("express")
const db = require('../../database')
const routes = express.Router()


routes.get('/' , async (req,res)=>{
const response = await db.query(`SELECT * from "reviews"`)
res.send({
    data:response.rows,
    count:response.rowCount
})
})

routes.get('/:id' , async (req,res)=>{
        const response = await db.query(`SELECT * from "products" where _id=$1`,[req.params.id])
        res.send(response.rows)
    })

routes.post('/:id' , async (req,res)=>{
    const creationDate = new Date()
    const response = await db.query(`INSERT INTO "reviews" (comment,rate,"productId","createdAt")
    VALUES($1,$2,$3,$4) RETURNING *`,
    [req.body.comment,req.body.rate,req.params.id,creationDate])
    res.send(response)
})

routes.put('/:id' ,async (req,res)=>{
    try {
        let parameters = []
        let query = 'UPDATE "reviews" SET '

        for(parameterName in req.body) 
        {
            query += (parameters.length > 0 ? ", " : '') + parameterName + " = $" +
             (parameters.length + 1 )
             parameters.push(req.body[parameterName])
        }
        parameters.push(req.params.id)
        query += " WHERE _id = $" + (parameters.length) + " RETURNING *" 
        console.log(query)
            const result = await db.query(query, parameters) 
       res.send(result)
    } catch (error) {
        console.log(error)
    }
})

routes.delete('/:id' ,async(req,res)=>{
    const response = await db.query(`DELETE FROM "reviews" where _id=$1`,[req.params.id])
    res.send("Deleted")
})


module.exports = routes