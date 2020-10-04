import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route strict exact path="/" render={() => <Home />} />
      <Route strict path="/fav" render={() => <Home isFav />} />
    </Router>
  </React.StrictMode>,
  rootElement
);
