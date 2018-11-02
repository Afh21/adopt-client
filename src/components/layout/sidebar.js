import React, { Component } from "react";
import { Layout, Icon } from "antd";
import MenuLinkSidebar from "./sider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import User from "../dashboard/user/user";
import Animal from "../dashboard/animal/animal";

import "../dashboard/dashboard.css";

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
    return (
      <Router>
        <Layout>
          {/* Links Sidebar */}
          <MenuLinkSidebar state={this.state} />

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
                <Route exact path="/dashboard/users" component={User} />
                <Route
                  exact
                  path="/dashboard/profile/:userId"
                  component={null}
                />

                <Route exact path="/dashboard/user/register" component={null} />
                <Route
                  exact
                  path="/dashboard/user/update/:userId"
                  component={null}
                />
                <Route exact path="/dashboard/adoptions/" component={null} />
                <Route exact path="/dashboard/animals/" component={Animal} />
                <Route
                  exact
                  path="/dashboard/animal/register"
                  component={null}
                />
                <Route
                  exact
                  path="/dashboard/animal/update/:animalId"
                  component={null}
                />
                <Route exact path="/dashboard/master/" component={null} />
                <Route
                  exact
                  path="/dashboard/master/type-rh"
                  component={null}
                />
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
                <Route
                  exact
                  path="/dashboard/master/type-breed"
                  component={null}
                />
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
            </Content>

            <Footer style={{ textAlign: "center" }}>
              Powered By Ing. Andres Felipe H. © 2018
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default withRouter(Sidebar);
