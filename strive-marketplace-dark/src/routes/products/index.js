const express = require("express")
const db = require('../../database')
const routes = express.Router()

routes.get('/' , async (req,res)=>{
    try {
        let result = await db.query(
          `SELECT *
            FROM products  LEFT JOIN LATERAL (  SELECT json_agg(json_build_object('_id', reviews._id
              , 'comment', reviews.comment, 'rate', reviews.rate, 'createdAt', "createdAt"))
               AS reviews  FROM  
               reviews  WHERE  products._id = "productId") reviews ON true`
        );
        if (result.rowCount > 0) 
        res.send({ data: result.rows });
        else
        res.status(404).send("not found");
      } catch (e) {
        console.log(e);
        res.status(500).send("Internal server error");
      }
    })

routes.get('/:id', async (req,res)=>{
     const response = await db.query(`select b.* , a.* from "products" AS b INNER JOIN "reviews" as
     A on b._id=a."productId"
    where a."productId" = $1`,[req.params.id])
    if(response.rowCount === 0){
        const response = await db.query(`SELECT * from "products" where _id=$1`,[req.params.id])
        res.send(response.rows)
    }
    else{
        res.send({
            data:response.rows,
            count:response.rowCount,
        })
    }
})

routes.post('/' , async (req,res)=>{
    const creationDate = new Date()
    const updatedDate = new Date()
    const response = await db.query(`INSERT INTO "products" (name,description,brand,imageurl,price,category,"createdAt","updatedAt")
    VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [req.body.name,req.body.description,req.body.brand,req.body.imageurl,req.body.price,req.body.category,creationDate,updatedDate])
    res.send(response)
})

routes.put('/:id' ,async (req,res)=>{
    try {
        let parameters = []
        let query = 'UPDATE "products" SET '

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
    const response = await db.query(`DELETE FROM "products" where _id=$1`,[req.params.id])
    res.send("Deleted")
})


module.exports = routes