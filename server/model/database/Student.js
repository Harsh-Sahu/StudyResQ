const mongoose = require("mongoose"); 
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({ 
    firstName: { type: String, required: true }, 
    
    lastName: { type: String }, email: { type: String, required: true, unique: true }, password: { type: String, required: true }, contactNo: { type: String, required: true }, timestamp: { type: Date, default: Date.now },tokens : [
        {
            token:{
                type : String,
                require:true
            }
        }
    ] }); 

    // GENERATING TOKEN

studentSchema.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}
module.exports = mongoose.model("Student", studentSchema);