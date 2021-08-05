import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import "./App.css";
import StudentSigin  from "./components/Screens/Signin/StudentSignin";
import AdminSignin from "./components/Screens/Signin/AdminSignin";
import StudentSignup from "./components/Screens/Signup/StudentSignup";
import AdminSignup from "./components/Screens/Signup/AdminSignup";
import React  from "react";
import {BrowserRouter,Link,Route,Switch } from "react-router-dom";

import Footer from "../src/components/footer";
import Header from "../src/components/header";

import home from "./components/home";
import about from "./components/about";
import contact from "./components/contact";

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Route path="/home" exact component={home} />
        <Route path="/about" exact component={about} />
        <Route path="/contact" exact component={contact} />
          
            <Route path="/studentsignin" component={StudentSigin} />
            <Route path="/adminsignin" component={AdminSignin} />
            <Route path="/studentsignup" component={StudentSignup}/>
            <Route path="/adminsignup" component={AdminSignup}/>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
