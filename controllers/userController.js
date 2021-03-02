exports.testing = async(req,res)=>{
  console.log("user",req.user)  
 return res.status(200).json({user:req.user})
}