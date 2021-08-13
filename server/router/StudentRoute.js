const express = require("express");
const expressAsynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const bcrypt = require("bcryptjs");
const Student = require("../model/database/Student");
const middleware = require("../middleware/middleware");
const studentRoute = express.Router();
studentRoute.post(
  "/signin",
  expressAsynchandler(async (req, res) => {
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

        if (!student.isAuthenticated) {
          console.log(req.body.email + " password valid");
          //GENERATING A 6 DIGIT  OTP
          var digits = "0123456789";
          let OTP = "";
          for (let i = 0; i <6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
          }

          const transporter = nodemailer.createTransport(
            sendgridTransport({
              auth: {
                api_key: process.env.SEND_GRID,
              },
            })
          );

          transporter.sendMail({
            to: req.body.email,
            from: process.env.COMPANY_EMAIL,
            subject: "VERIFY ONLINE LIBRARY OTP",
            html: `<h1>Welcome to Online Library...</h1>
          <i>You are just one step away from verifying your email.</i><br/>
          Your OTP is:  <h2>${OTP}</h2>. <br/>Just Enter this OTP on the email verification screen`,
          });

          const updateOtp = await Student.findOneAndUpdate(
            { _id: student._id },
            { otp: { otpCode: OTP, timeStamp: Date.now() } },
            function (err, res) {
              if (err) {
                console.log(err);
              } else {
                console.log(
                  req.body.email + " OTP updation success with OTP: " + OTP
                );
              }
            }
          );
        }
        const token = jwt.sign({ _id: student._id }, process.env.JWT_SECRET, {
          expiresIn: "28d",
        });
        return res.send({
          _id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          message: "Success",
          isAuthenticated: student.isAuthenticated,
          token: token,
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

studentRoute.post("/allstudents", (req, res) => {
  Student.find({}).exec((err, students) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    return res.json({ students });
  });
});


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
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }

      const transporter = nodemailer.createTransport(
        sendgridTransport({
          auth: {
            api_key: process.env.SEND_GRID,
          },
        })
      );

      transporter.sendMail({
        to: req.body.email,
        from: process.env.COMPANY_EMAIL,
        subject: "VERIFY  OTP",
        html: `<h1>Welcome to Online Library...</h1>You are just one step away from verifying your email.
          //       Your OTP is ${OTP}. Just Enter this OTP on the email verification screen`,
      });
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
        otp: { otpCode: OTP, timeStamp: Date.now() },
        isAuthenticated: false,
      });

      console.log(user.firstName);
      console.log(user.email);
      console.log(user.lastName);
      console.log(user.password);
      console.log(user.contactNo);
      console.log(user.otp.OTP);

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

studentRoute.post(
  "/verifystudent",
  expressAsynchandler(async (req, res) => {

    console.log(req.body.id);
    const student = await Student.findById(req.body.id);
    return res.status(200).send({ isverified:student.isAuthenticated});
  })
);

studentRoute.post(
  "/studentotp",
  expressAsynchandler(async (req, res) => {
    console.log(req.body.otp);
    const student = await Student.findById(req.body.id);
    if ((req.body.timestamp - student.otp.timeStamp) / (1000 * 60) > 5) {
      res.status(401).send({ message: "OTP Expired" });
    } else {
      if (req.body.otp === student.otp.otpCode) {
        await Student.findByIdAndUpdate(req.body.id, {
          isAuthenticated: true,
        });
        res.status(200).send({
          message: "Valid OTP...User Authenticated",
          token: student.token,
        });
      } else {
        res.status(401).send({ message: "Invalid OTP" });
      }
    }
  })
);

module.exports = studentRoute;
