const express = require("express")
const students = require('../../models/students')
const sequelize = require('../../db/db')
const projects = require("../../models/projects")
const routes = express.Router()

routes.get('/' , async(req,res)=>{
    const response = await students.findAll({
        include:projects
    })
    res.send(response)
})
routes.get('/:id' , async(req,res)=>{
    const response = await students.findOne({
        where:{
            _id:req.params.id
        },
        include : projects
    })
    res.send(response)
})
routes.post('/' , async(req,res)=>{
    const response = await students.create(req.body)
    res.send(response)
})

routes.put('/:id' ,async (req,res)=>{
    const response = await students.update({
        ...req.body
    },{
        where: {
            _id:req.params.id
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
    const response = await students.destroy({
        where:{
            _id:req.params.id
        }
    })
    if(response === 1){
        res.send("Student Deleted")
    }
    else{
        res.status(404).send("Not Found")
    }
})
module.exports = routes

