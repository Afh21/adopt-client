import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// Components
import Landing from "./components/layout/landing";
import Render from "./components/dashboard/dashboard/index";
import NoFound from './components/noFound/not-found';

// Css ---> <Route exact path="/dashboard/users/" component={User} />
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={null} />
            <Route exact path="/register" component={null} />
            <Route path="/dashboard" component={Render} />
            <Redirect component={NoFound}></Redirect>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
