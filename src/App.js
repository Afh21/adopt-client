import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
// import Navbar from "./components/layout/navbar";
import Dashboard from "./components/dashboard/dashboard";

// Css
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="">
          <Route exact path="/" component={null} />
          <Route exact path="/login" component={null} />
          <Route exact path="/register" component={null} />
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/profile/:userId" component={null} />
            <Route exact path="/dashboard/users/" component={null} />
            <Route exact path="/dashboard/user/register" component={null} />
            <Route
              exact
              path="/dashboard/user/update/:userId"
              component={null}
            />
            <Route exact path="/dashboard/adoptions/" component={null} />
            <Route exact path="/dashboard/animal/" component={null} />
            <Route exact path="/dashboard/animal/register" component={null} />
            <Route
              exact
              path="/dashboard/animal/update/:animalId"
              component={null}
            />
            <Route exact path="/dashboard/master/" component={null} />
            <Route exact path="/dashboard/master/type-rh" component={null} />
            <Route
              exact
              path="/dashboard/master/type-rh/register"
              component={null}
            />
            <Route
              exact
              path="/dashboard/master/type-rh/update/:typeId"
              component={null}
            />
            <Route exact path="/dashboard/master/type-breed" component={null} />
            <Route
              exact
              path="/dashboard/master/type-breed/register"
              component={null}
            />
            <Route
              exact
              path="/dashboard/master/type-breed/upate/:breedId"
              component={null}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
