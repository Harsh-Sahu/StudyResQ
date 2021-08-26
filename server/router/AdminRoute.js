const express = require('express');
const expressAsynchandler = require('express-async-handler');

const bcrypt = require('bcryptjs');
const Admin = require('../model/database/Admin');

const adminRoute = express.Router();
adminRoute.post("/signin", 
expressAsynchandler(async(req, res) => {
    
    console.log(req.body.email);
    if (!req.body.email) {
        return (res.send({ message: "Please Enter email id" }))
    } else if (!req.body.password) {
        return res.send({ message: "Please enter password" });
    }
    // console.log("Request");
    const admin = await Admin.findOne({ email: req.body.email });

    console.log(req.body.email + " admin wants to sign in ");

    if (admin) {
        console.log(req.body.email + " admin signin found in database");

        if(bcrypt.compareSync(req.body.password,admin.password))
        {
            return res.send({
                firstName:admin.firstName,
                lastName:admin.lastName,
                email:admin.email,
                message:"Success"
            });
        }
        else
        {
            console.log("Invalid Password");
            res.send({
                message: "Invalid email or password",
               
            });
            // window.location.reload();
        }
    } else {
        console.log("Invalid Email");
        res.send({
            message: "Invalid email or password",
        });
        // window.location.reload();
    }

}));

adminRoute.post("/signup",
expressAsynchandler(async(req,res)=>{

    console.log(req.body.email + " admin requested to register");

    const admin = await Admin.findOne({ email: req.body.email });

    if(admin)
    {
        console.log(req.body.email+" admin already registered ");
        res.send({
            message:"Email Already Registered"
        });
    }
    else{

        // var digits = "0123456789";
        // let OTP = "";
        // for (let i = 0; i < 6; i++) {
        //   OTP += digits[Math.floor(Math.random() * 10)];
        // }

        // const transporter=nodemailer.createTransport(
        //     sendgridTransport({
        //         auth:
        //     })
        // )


        const user=new Admin({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            contactNo:req.body.contactNo
        });

        console.log(user.firstName);
        console.log(user.email);
        console.log(user.lastName);
        console.log(user.password);
        console.log(user.contactNo);

        const creatstudent=await user.save();

        console.log(req.body.email + " admin created");

        res.status(200).send({
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            contactNo:user.contactNo,
            message:"Success"
        });
    }
}));

module.exports = adminRoute;