import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Landing from "./components/layout/landing";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Render from "./components/dashboard/dashboard/index";

// Css ---> <Route exact path="/dashboard/users/" component={User} />
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/dashboard" component={Render} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
