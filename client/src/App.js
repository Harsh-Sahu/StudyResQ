import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import StudentSignin from "./components/Screens/Signin/StudentSignin";
import AdminSignin from "./components/Screens/Signin/AdminSigin";
import StudentSignup from "./components/Screens/Signup/StudentSignup";
import AdminSignup from "./components/Screens/Signup/AdminSignup";

import AdminOTP from "./components/Screens/AdminOTP/AdminOtp";
import Footer from "../src/components/footer";
import Header from "../src/components/header";
import  HomePage from "../src/components/Screens/HomeScreen/HomePage";

import StudentOTP from "./components/Screens/StudentOTP/StudentOTP";
import home from "./components/home";
import about from "./components/about";
import contact from "./components/contact";
import myshelf from "./components/myshelf";

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
];

function App() {
  return (
    <div>
      <Header title="StudyResQ" sections={sections} />
      <Router>
        <Route path="/home" exact component={home} />
        <Route path="/about" exact component={about} />
        <Route path="/contact" exact component={contact} />
        <Route path="/myshelf" exact component={myshelf} />

        <Route path="/studentsignin" component={StudentSignin} />
        <Route path="/adminsignin" component={AdminSignin} />
        <Route path="/studentsignup" component={StudentSignup} />
        <Route path="/adminsignup" component={AdminSignup} />
        <Route path="/homepage"  component={ HomePage}/>
        <Route path="/studentotp" component={StudentOTP}/>
        <Route path="/adminotp" component={AdminOTP}/>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
