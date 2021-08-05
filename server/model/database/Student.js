const mongoose = require("mongoose"); 
const studentSchema = new mongoose.Schema({ 
    firstName: { type: String, required: true }, 
    
    lastName: { type: String }, email: { type: String, required: true, unique: true }, password: { type: String, required: true }, contactNo: { type: String, required: true }, timestamp: { type: Date, default: Date.now } }); 
module.exports = mongoose.model("Student", studentSchema);