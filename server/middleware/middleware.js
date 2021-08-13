const jwt=require("jsonwebtoken");
const Student = require('../model/database/Student');
const Admin = require('../model/database/Admin');
const expressAsyncHandler = require("express-async-handler");

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ error: "Authorization required" });
  }
  next();
};

exports.isUnAuthenticated = expressAsyncHandler(async(req,res,next)=>{
  {
    if(!req.headers.authorization){
      return res.status(401).json({ error: "Authorization required" });
    }else {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      const student = await Student.findById(user._id);
      if(student.isAuthenticated){
        return res.status(401).json({ error: "Already authenticated" });
      }
    }
    next();
  }
})

exports.isUnAuthenticatedAdmin = expressAsyncHandler(async(req,res,next)=>{
  {
    if(!req.headers.authorization){
      return res.status(401).json({ error: "Authorization required" });
    }else {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(user._id);
      if(admin.isAuthenticated){
        return res.status(401).json({ error: "Already authenticated" });
      }
    }
    next();
  }
})