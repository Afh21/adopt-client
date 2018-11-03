import React, { Component } from "react";
import { Layout, Icon } from "antd";
import MenuLinkSidebar from "./sider";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";

// Components
import Animal from "../dashboard/animal/animal";
import Dashboard from "../dashboard/dashboard/dashboard";
import User from "../dashboard/user/user";
import Adoptions from "../dashboard/adoption/adoption";
import Master from "../dashboard/master/master";

// import NoFound from "../noFound/not-found";

// Css
import "../dashboard/dashboard/dashboard.css";

const { Header, Content, Footer } = Layout;

class Sidebar extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { match } = this.props;
    console.log(match.path);
    return (
      <Layout>
        {/* Links Sidebar */}
        <MenuLinkSidebar state={this.state} match={this.props.match} />

        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>

          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 645
            }}
          >
            <Switch>
              <Route exact path={`${match.url}`} component={Dashboard} />
              <Route exact path={`${match.path}/animals`} component={Animal} />
              <Route exact path={`${match.path}/users`} component={User} />
              <Route
                exact
                path={`${match.path}/user/adoptions`}
                component={Adoptions}
              />
              <Route exact path={`${match.path}/master`} component={Master} />
              {/* <Redirect to="/no-found" component={NoFound} /> */}
            </Switch>
          </Content>

          <Footer style={{ textAlign: "center" }}>
            Powered By Ing. Andres Felipe H. © 2018
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

Sidebar.propTypes = {
  match: PropTypes.object.isRequired
};

export default withRouter(Sidebar);
