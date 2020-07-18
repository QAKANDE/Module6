const orm = require('../../db/db')
const Sequelize = require("sequelize")

const projects = orm.define("projects",{
    projectid:{
        type:Sequelize.NUMBER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        primaryKey:true
    },
    description:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    liveurl:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    repourl:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    studentid:{
        type:Sequelize.NUMBER,
        allowNull: false,
    },
    creationdate:{
        type:Sequelize.DATE,
        allowNull:false
    }
} ,{
    timestamps:false
})

module.exports = projects