const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var uuid = require("uuid")
var db =require("../config/dbConfig")
 exports.signup = async(req,res)=>{
     console.log("insignup")
     await db.query(`SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(req.body.username)}) `,async(err,result)=>{
         console.log("here")
         if(err) throw err;
         if(result.length){
             return res.status(409).json({message:"username is already in use"})
         } else{
             console.log("in")
             await bcrypt.hash(req.body.password,10,(err,response)=>{
                 if(err) throw err;
                 console.log(req.body.username)
                 db.query(`INSERT INTO users (id,username,password,registered) VALUES ('${uuid.v4()}',${db.escape(req.body.username)},${db.escape(response)},${Date.now()})`,(err,success)=>{
                     if(err) throw err;
                     return res.status(200).json({message:"Registered"})
                 })
             }) 
         }
     })
 }

 exports.signin = async(req,res)=>{
   var user = db.query(`SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(req.body.username)})`,async(err,response)=>{
       if(response.length){
           var match = await bcrypt.compare(req.body.password,response[0].password)
           console.log(match)
           if(!match){
            return res.status(200).json({message:"Invalid Credentials"})
        }
        const token = await jwt.sign({username:response[0].username,userId:response[0].id},`${process.env.SECRET}`,{expiresIn: '7d'})
       await db.query(`UPDATE users SET token = '${token}' WHERE id='${response[0].id}'`)
        return res.status(200).json(response)
       }else{
        return res.status(200).json({message:"User not found"})
       }

   })
 }