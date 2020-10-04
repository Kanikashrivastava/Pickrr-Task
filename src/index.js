import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/fav">
          <div>fav</div>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  rootElement
);
