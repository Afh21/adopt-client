import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import ProtectedRoute from "./utilities/RoutesProtected/ProtectedRoute";

// Components
// import Landing from "./components/layout/landing";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import IndexDashboard from "./components/dashboard/dashboard/index";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { setAuthToken } from "./utilities/BearerToken/setToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";

// Antd
import { message } from "antd";
import "./App.css";

// Check LocalStore
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTIme = Date.now() / 1000;
  if (decoded.exp < currentTIme) {
    message.success("La sesión está a punto de terminar", 5);

    // Logout user
    store.dispatch(logoutUser());

    // Clear current profile
    //store.dispatch(clearCurrentProfile());  --- Esto es super Importante

    // Clear current profile
    // Redirect to login

    window.location.href = "/";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Switch>
              <ProtectedRoute path="/dashboard/" component={IndexDashboard} />
              <Route path="*" render={() => <Redirect to="/login" />} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
