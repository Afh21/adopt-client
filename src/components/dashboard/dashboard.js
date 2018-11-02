import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "../layout/sidebar";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Sidebar />
      </div>
    );
  }
}

export default withRouter(Dashboard);
