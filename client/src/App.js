import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
      </Router>
      <Footer />
    </div>
  );
}

export default App;
