const mongoose = require("mongoose"); 

const adminSchema = new mongoose.Schema(
    { firstName: { type: String, required: true }, lastName: { type: String }, email: { type: String, required: true, unique: true },otp:{type: {
        otpCode:{
          type:String,
          required:true
        },
        timeStamp:{
          type: Date,
          default: Date.now
        }
      }},
      isAuthenticated: {type:Boolean, default:false}, password: { type: String, required: true }, contactNo: { type: String, required: true}})
     
    module.exports = mongoose.model("Admin", adminSchema);
