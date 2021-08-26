const express = require("express");
const expressAsynchandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Student = require("../model/database/Student");
const jwt = require("jsonwebtoken");
const studentRoute = express.Router();



studentRoute.post(
  "/signin",
  expressAsynchandler(async (req, res) => {
    let token;
    console.log(req.body.email);
    if (!req.body.email) {
      return res.send({ message: "Please Enter email id" });
    } else if (!req.body.password) {
      return res.send({ message: "Please enter password" });
    }
    // console.log("Request");
    const student = await Student.findOne({ email: req.body.email });

    console.log(req.body.email + " wants to sign in ");

    if (student) {
      console.log(req.body.email + " signin found in database");

      if (bcrypt.compareSync(req.body.password, student.password)) {
        // generating token for student
        token = await student.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires:new Date(Date.now() + 25892000000),
          httpOnly:true
      });
        return res.send({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          message: "Success",
        });
      } else {
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
  })
);


studentRoute.post(
  "/signup",
  expressAsynchandler(async (req, res) => {
    console.log(req.body.email + " requested to register");

    const student = await Student.findOne({ email: req.body.email });

    if (student) {
      console.log(req.body.email + " already registered ");
      res.send({
        message: "Email Already Registered",
      });
    } else {
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

      const user = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        contactNo: req.body.contactNo,
      });

      console.log(user.firstName);
      console.log(user.email);
      console.log(user.lastName);
      console.log(user.password);
      console.log(user.contactNo);

      const creatstudent = await user.save();

      console.log(req.body.email + " student created");

      res.status(200).send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contactNo: user.contactNo,
        message: "Success",
      });
    }
  })
);

studentRoute.get('/logout',(req, res)=>{

  res.clearCookie('jwtoken', { path : "/"});
  res.status(200).send("user logout");
})

module.exports = studentRoute;
