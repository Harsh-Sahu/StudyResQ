import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import StudentSigin from "./components/Screens/Signin/StudentSignin";
import AdminSignin from "./components/Screens/Signin/AdminSigin";
import StudentSignup from "./components/Screens/Signup/StudentSignup";
import AdminSignup from "./components/Screens/Signup/AdminSignup";

import Footer from "../src/components/footer";
import Header from "../src/components/header";
import HomePage from "../src/components/Screens/HomeScreen/HomePage";

import home from "./components/home";
import about from "./components/about";
import contact from "./components/contact";
import myshelf from "./components/myshelf";

import { initialState, reducer } from "./reducer/UseReducer";

// crete context
export const userContext = createContext();

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
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <userContext.Provider value={{ state, dispatch }}>
        <Header title="StudyResQ" sections={sections} />
        <Router>
          <Route path="/home" exact component={home} />
          <Route path="/about" exact component={about} />
          <Route path="/contact" exact component={contact} />
          <Route path="/myshelf" exact component={myshelf} />
          <Route path="/homepage" component={HomePage} />
          <Route path="/studentsignin" component={StudentSigin} />
          <Route path="/adminsignin" component={AdminSignin} />
          <Route path="/studentsignup" component={StudentSignup} />
          <Route path="/adminsignup" component={AdminSignup} />
        </Router>
        <Footer />
      </userContext.Provider>
    </div>
  );
}

export default App;
