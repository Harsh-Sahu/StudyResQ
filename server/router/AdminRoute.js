const express = require("express");
const expressAsynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const bcrypt = require("bcryptjs");
const Admin = require("../model/database/Admin");
const middleware = require("../middleware/middleware");
const adminRoute = express.Router();

adminRoute.post(
  "/signin",
  expressAsynchandler(async (req, res) => {
    console.log(req.body.email);
    if (!req.body.email) {
      return res.send({ message: "Please Enter email id" });
    } else if (!req.body.password) {
      return res.send({ message: "Please enter password" });
    }
    // console.log("Request");
    const admin = await Admin.findOne({ email: req.body.email });

    console.log(req.body.email + " wants to sign in ");

    if (admin) {
      console.log(req.body.email + " signin found in database");

      if (bcrypt.compareSync(req.body.password, admin.password)) {

        if (!admin.isAuthenticated) {
          console.log(req.body.email + " password valid");
         

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

          const updateOtp = await Admin.findOneAndUpdate(
            { _id: admin._id },
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
        const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
          expiresIn: "28d",
        });
        return res.send({
          _id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          email:admin.email,
          message: "Success",
          isAuthenticated:admin.isAuthenticated,
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

adminRoute.post("/alladmins", (req, res) => {
  Admin.find({}).exec((err, admins) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    return res.json({ admins });
  });
});


adminRoute.post(
  "/signup",
  expressAsynchandler(async (req, res) => {
    console.log(req.body.email + " requested to register");

    const admin = await Admin.findOne({ email: req.body.email });

    if (admin) {
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

      const user = new Admin({
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

      console.log(req.body.email + " admin created");

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

adminRoute.post(
  "/verifyadmin",
  expressAsynchandler(async (req, res) => {

    console.log(req.body.id);
    const admin = await Admin.findById(req.body.id);
    return res.status(200).send({ isverified:admin.isAuthenticated});
  })
);

adminRoute.post(
  "/adminotp",
  expressAsynchandler(async (req, res) => {
    console.log(req.body.otp);
    const admin = await Admin.findById(req.body.id);
    if ((req.body.timestamp - admin.otp.timeStamp) / (1000 * 60) > 5) {
      res.status(401).send({ message: "OTP Expired" });
    } else {
      if (req.body.otp === admin.otp.otpCode) {
        await Admin.findByIdAndUpdate(req.body.id, {
          isAuthenticated: true,
        });
        res.status(200).send({
          message: "Valid OTP...User Authenticated",
          token: admin.token,
        });
      } else {
        res.status(401).send({ message: "Invalid OTP" });
      }
    }
  })
);

module.exports = adminRoute;
