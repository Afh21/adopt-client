import React from "react";
import Sidebar from "../../layout/sidebar";
import { withRouter } from "react-router-dom";

const IndexDashboard = () => {
  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default withRouter(IndexDashboard);
