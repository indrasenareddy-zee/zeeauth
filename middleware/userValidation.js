exports.userValidation = async(req,res,next)=>{
if(!req.body.username || req.body.username.length<4){
    return res.status(400).json({message:"Please enter a username with min. 3 chars"})
}
next()
}