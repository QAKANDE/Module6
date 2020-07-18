const express = require("express")
const projects = require('../../models/projects')
const sequelize = require('../../db/db')
const routes = express.Router()

routes.get('/' , async(req,res)=>{
    const response = await projects.findAll()
    res.send(response)
})
routes.get('/:id' , async(req,res)=>{
    const response = await projects.findAll({
        where:{
            projectid:req.params.id
        }
    })
    res.send(response)
})
routes.post('/:id' , async(req,res)=>{
    const response = await projects.create({
        ...req.body,
        studentid:req.params.id
    })
    res.send(response)
})
routes.put('/:id' ,async (req,res)=>{
    const response = await projects.update({
        ...req.body
    },{
        where: {
        projectid:req.params.id
        }
    })
    if(response[0]===1){
        res.send(response)
    }
    else{
        res.status(404).send("Not Found")
    }
})

routes.delete('/:id', async(req,res)=>{
    const response = await projects.destroy({
        where:{
            projectid:req.params.id
        }
    })
    if(response === 1){
        res.send("Project Deleted")
    }
    else{
        res.status(404).send("Not Found")
    }
})

module.exports = routes

