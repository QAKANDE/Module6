const express = require("express")
const db = require("../../db")
const routes = express.Router()


routes.get("/bothtables", async(req,res)=>{
    const response = await db.query(`select b.* , a.email from "projects" AS b INNER JOIN "student" as A on b.studentid=a._id`)
res.send(response.rows)
})

routes.get('/' , async (req,res)=>{
    const response = await db.query(`select * from "projects"`)
    res.send({
        data:response.rows,
        count:response.rowCount
      })
})

routes.post('/:id',async(req,res)=>{
    const response =  await db.query(`INSERT INTO "projects" (name, description,repourl,liveurl,studentid,creationdate) 
    Values ($1, $2, $3, $4, $5 , $6 ) RETURNING *`, 
    [req.body.name, req.body.desc,req.body.repoUrl,req.body.liveUrl,req.params.id,req.body.creationDate])
    res.send(response)
    // const response = await db.query(`CREATE TABLE "project" 
    // (project_id SERIAL PRIMARY KEY,name TEXT NOT NULL,description TEXT NOT NULL,
    //     creationdate DATE NOT NULL,repourl TEXT NOT NULL,liveurl TEXT NOT NULL,
    //     _id int FOREIGN KEY REFERENCES students(_id))`)
})


routes.put('/projects/:id' ,async (req,res)=>{
    try {
        let parameters = []
        let query = 'UPDATE "projects" SET'
        for(parameterName in req.body) 
        {
            query += (parameters.length > 0 ? "," : '') + parameterName + "=$" +
             (parameterName.length + 1 )
             parameters.push(req.body[parameterName])
        }
        parameters.push(req.params.id)
        query += " WHERE projectid = $" + (parameters.length) + " RETURNING *" 
            const result = await db.query(query, parameters) 
         console.log("ok")
    } catch (error) {
        console.log(error)
    }
})

routes.delete('/:id' ,async(req,res)=>{
    const response = await db.query(`DELETE FROM "projects" where projectid=$1`,[req.params.id])
    res.send("Deleted")
})
module.exports = routes