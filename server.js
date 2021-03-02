var express = require("express")
var cors = require('cors')
var sql = require("mysql")
var morgan = require('morgan')
var bodyParser = require("body-parser")
require('dotenv').config()
var connection = require("./config/dbConfig")
var authRoutes = require("./routes/authRoute")
var userRoutes = require("./routes/userRoute")
const { connect } = require("./config/dbConfig")
var {auth} = require("./middleware/auth")
var app=express()
app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json())
var port = process.env.PORT || 3099
app.get("/create",(req,res)=>{
    try{
    connection.query("CREATE TABLE users(id VARCHAR(255),username VARCHAR(255),password VARCHAR(255),registered VARCHAR(255),token VARCHAR(255))",(err,resp)=>{
        if(err) throw err;
        return res.status(200).json({message:"table created"})
    })
    }catch(err){
        console.log(err)
    }
    })

    app.get('/test',auth,(req,res)=>{
        return res.status(200).json({message:"checked"})
    })
app.use("/auth",authRoutes)
app.use("/user",auth,userRoutes)
app.listen(port,(req,res)=>{
    console.log(process.env.PORT)
    console.log(`server  is up on ${port}`)
})