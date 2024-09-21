const { CustomError } = require("../utils/Excpetions");
const jwt=require('jsonwebtoken')

exports.IsAdmin = async (req, res, next) => {
  const { user } = req.user;
  if (!user) {
    throw new CustomError("user Is not logged in", 404);
  }
  if (user.role === "admin") {
    next();
  } else {
    throw new CustomError("access denied",403);
  }
};
exports.IsAuthenticated=async(req,res,next)=>{
    const auth= req.headers('Authorization')
    if(!auth){
        throw new CustomError("token is not found",404);
    }
   
    const token=auth.replace('Bearer','');
    const isValid=jwt.verify(token,"secret key");

    if(!isValid){
        throw new CustomError("Unauthorize",401);
    }
    try {
        const user=await UserModel.findById(isValid);
        if(!user){
            throw new CustomError("user not found",404);
        }
        req.user=user;
        next();
    } catch (error) {
        throw new CustomError("database error",500);
    }
}

exports.IsValidUser=async(req,res,next)=>{
    const {userId}=req.params;
    const {user}=req;
    
    if(user.userId!==userId){
        throw new CustomError("access denied",403);
    }
    next();
}

