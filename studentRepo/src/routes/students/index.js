const express = require("express")
const db = require("../../db")
const routes = express.Router()

routes.get('/' , async (req,res)=>{
    const response = await db.query(`select * from "student"`)
    res.send({
        data:response.rows,
        count:response.rowCount
      })
})
routes.get('/:id' , async (req,res)=>{
    const response = await db.query(`SELECT * FROM "student" WHERE _id = $1`,[req.params.id])
    res.send(response.rows[0])
})

routes.post('/', async(req,res)=>{
   const response =  await db.query(`INSERT INTO "student" (name, surname, email, "DOB") 
    Values ($1, $2, $3, $4) RETURNING *`, 
    [ req.body.name, req.body.surname, req.body.email, req.body.DOB])
    res.send(response)
  console.log(response)
})

routes.post('/checkemail',async(req,res)=>{
  const response = await db.query(`SELECT * from "student" WHERE email=$1`,[req.body.email])
  if(response.rowCount > 0){
  res.send("Email already exists")
  }
  else
  {
    const response =  await db.query(`INSERT INTO "student" (name, surname, email, "DOB") 
    Values ($1, $2, $3, $4) RETURNING *`, 
    [ req.body.name, req.body.surname, req.body.email, req.body.DOB])
    res.send(response.rows)
  }
})

routes.delete('/:id',async(req,res)=>{
  const response = await db.query(`DELETE FROM "student" WHERE _id = $1` , [req.params.id])
  res.send("Deleted")
})


module.exports = routes