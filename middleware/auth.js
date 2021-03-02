const jwt = require("jsonwebtoken");
var db = require("../config/dbConfig")
exports.auth = async(req,res,next)=>{
    
    if(!req.headers.authorization){
        return res.status(409).json({message:"you are not authorized to do this"})

    }
    const token = req.headers.authorization.split(' ')[1];
    
    var decoded;
  await jwt.verify(token,process.env.SECRET,(err,resp)=>{
      if (err){
          console.log("in")
          return res.status(409).json({message:"invalid token"})
      }
decoded = resp
  })

 
 await db.query(`SELECT * FROM users WHERE id = '${decoded.userId}'`,async(err,response)=>{
    
     req.user = response[0]
    await console.log(req.user)
    next()
 })

}