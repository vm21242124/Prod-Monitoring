exports.ErrorHandler=async(err,req,res,next)=>{
    if(err){
      const errStatus=err.statusCode || 500;
      const errMsg=err.message || "something went wrong";
      return res.status(errStatus).json({
        success:false,
        message:errMsg
      })
    }
    next();
  }