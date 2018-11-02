import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Landing from "./components/layout/landing";
import Dashboard from "./components/dashboard/dashboard";

// Css ---> <Route exact path="/dashboard/users/" component={User} />
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={null} />
            <Route exact path="/register" component={null} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
