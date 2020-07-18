const orm = require('../../db/db')
const Sequelize = require("sequelize")
const projects = require('../projects')
const student = orm.define("student",{
    _id:{
        type:Sequelize.NUMBER,
        primaryKey:true,
        autoIncrement: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    surname:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    email:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    DOB:{
        type:Sequelize.STRING,
        allowNull: false,
    },
},{
    timestamps:false,
    tableName:"student",
    freezeTableName: true
})

student.hasMany(projects,{
    foreignKey: "studentid"
})

module.exports = student