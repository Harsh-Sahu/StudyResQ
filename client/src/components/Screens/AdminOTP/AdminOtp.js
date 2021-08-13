import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
require('dotenv').config()


const jwt = require("jsonwebtoken");
// import LoadingScreen from "../LoadingScreen/LoadingScreen";
toast.configure();

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Library
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/images/img.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AdminOTP() {
  const classes = useStyles();
  const [otp, setOtp] = useState("");
  const [id, setid] = useState("");
  const history = useHistory();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      setLoading(true);
    // toast.success("uieuri");
    // const token=localStorage.getItem("Studenttoken");
    // toast.success(token);
    const decoded_token = jwt.verify(
        localStorage.getItem("Admintoken"),
         process.env.REACT_APP_JWT_SECRET
      );
      toast.error(decoded_token._id);
      setid(decoded_token._id);
    //   toast.success(id);
      fetch("http://localhost:3001/api/admin/verifyadmin", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: decoded_token._id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          if (result.isverified) {
              
            history.push("/");
          }
        });
    } catch (err) {
        toast.error("error");
      setLoading(false);
    //   history.push("/signin");
    }
  }, []);

  const submitHandler = () => {
      
    if (otp === "") {
      console.log("Please enter otp");
    } else {
      fetch("http://localhost:3001/api/admin/adminotp", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          otp: otp,
          timestamp: Date.now(),
          id: id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
         
          if (result.message === "Valid OTP...Admin Authenticated") {
            toast.success("Sweet !", {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
            sleep(2000).then(() => {
              history.push("/");
              window.location.reload(false);
            });
          } else {
            toast.warning(result.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
          }
        });
    }
  };
  return (
    <>
      {}

      { (
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Student OTP
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="Enter the 6 digit OTP sent to your email id"
                  name="otp"
                  autoComplete="otp"
                  autoFocus
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={submitHandler}
                >
                  Submit OTP
                </Button>
                {/* <div id="my-signin2"></div> */}
                <Box mt={3} />
                <Grid container>
                 
                  <Grid item>
                    <Link href="/adminsignup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
}