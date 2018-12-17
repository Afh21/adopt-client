import React, { Component } from "react";
import { Layout, Icon, Button, Menu } from "antd";
import { Tag } from "antd";
// import MenuLinkSidebar from "./sider";
import PropTypes from "prop-types";
import {
  Switch,
  withRouter,
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

// Components
import Animal from "../dashboard/animal/animal";
import RegisterAnimal from "../dashboard/animal/animal-register";
import AnimalEdit from "../dashboard/animal/animal-edit";
import Dashboard from "../dashboard/dashboard/dashboard";
import Profile from "../dashboard/user/profile";
import User from "../dashboard/user/user";
import RegisterUser from "../dashboard/user/register";
import Adoptions from "../dashboard/adoption/adoption";

import Breed from "../../components/dashboard/master/type-breed/type-breed";
import Rh from "../../components/dashboard/master/type-rh/type-rh";
import MapAdoptions from "../../components/dashboard/map/map-Adoptions";
import ProtectedRoute from "../../utilities/RoutesProtected/ProtectedRoute";
// import NoFound from "../noFound/not-found";

// Redux
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";

// Css
import "../dashboard/dashboard/dashboard.css";

const SubMenu = Menu.SubMenu;
const { Header, Content, Footer, Sider } = Layout;

class Sidebar extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  onCloseSession = () => {
    const { history } = this.props;
    this.props.logoutUser(history);
  };

  render() {
    const { collapsed } = this.state;
    const { user } = this.props.auth;
    const { match } = this.props;

    return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <Menu
              theme="dark"
              defaultOpenKeys={["home", "users", "animals", "settings"]}
              mode="inline"
            >
              <SubMenu
                key="home"
                title={
                  <span>
                    <Icon type="home" />
                    <span>Home</span>
                  </span>
                }
              >
                {user.rol === "administrator" ? (
                  <Menu.Item key="1">
                    <Link to={`${match.url}`}>
                      <Icon type="dashboard" />
                      <span>Dashboard</span>
                    </Link>
                  </Menu.Item>
                ) : null}

                <Menu.Item key="2">
                  <Link to={`${match.url}/user/profile`}>
                    <Icon type="user" />
                    <span>Perfil</span>
                  </Link>
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="animals"
                title={
                  <span>
                    <Icon type="table" theme="outlined" />
                    <span>Animales</span>
                  </span>
                }
              >
                <Menu.Item key="3">
                  <Link to={`${match.url}/animals`}>
                    <Icon type="bars" />
                    <span>Lista</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="12">
                  <Link to={`${match.url}/map`}>
                    <Icon type="compass" theme="outlined" />
                    <span>Mapa </span>
                  </Link>
                </Menu.Item>

                {user.rol === "administrator" ? (
                  <Menu.Item key="4">
                    <Link to={`${match.url}/animal/register`}>
                      <Icon type="switcher" theme="outlined" />
                      <span>Registro</span>
                    </Link>
                  </Menu.Item>
                ) : null}
              </SubMenu>

              {user.rol === "administrator" ? (
                <SubMenu
                  key="users"
                  title={
                    <span>
                      <Icon type="team" theme="outlined" />
                      <span>Usuarios</span>
                    </span>
                  }
                >
                  <Menu.Item key="6">
                    <Link to={`${match.url}/users`}>
                      <Icon type="bars" />
                      <span>Lista</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="7">
                    <Link to={`${match.url}/user/register`}>
                      <Icon type="user-add" theme="outlined" />
                      <span>Registro</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <Link to={`${match.url}/user/adoptions`}>
                      <Icon type="audit" theme="outlined" />
                      <span>Adopciones</span>
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}

              {user.rol === "administrator" ? (
                <SubMenu
                  key="settings"
                  title={
                    <span>
                      <Icon type="setting" theme="outlined" />
                      <span>Configuraciones</span>
                    </span>
                  }
                >
                  <Menu.Item key="10">
                    <Link to={`${match.url}/master/type-rh`}>
                      <Icon type="heart" theme="outlined" />
                      <span>TIpo Rh</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="11">
                    <Link to={`${match.url}/master/type-breed`}>
                      <Icon type="tag" theme="outlined" />
                      <span>Tipo Raza</span>
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{ background: "#ffff", padding: 0, lineHeight: "64px" }}
            >
              <Icon
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
              Bienvenido,{" "}
              <Tag color="orange">
                {user.name} {user.lastname}
              </Tag>
              <Button
                type="danger"
                icon="logout"
                ghost
                onClick={this.onCloseSession}
                style={{ float: "right", margin: 13 }}
              >
                Cerrar Sesión
              </Button>
            </Header>

            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 600
              }}
            >
              <Switch>
                <ProtectedRoute
                  exact
                  path={`${match.path}`}
                  component={Dashboard}
                />
                <ProtectedRoute
                  exact
                  path={`${match.path}user/profile`}
                  component={Profile}
                />
                <ProtectedRoute
                  exact
                  path={`${match.path}animals`}
                  component={Animal}
                />
                <ProtectedRoute
                  exact
                  path={`${match.path}animal/register`}
                  component={RegisterAnimal}
                />
                <ProtectedRoute
                  exact
                  path={`${match.path}animal/edit/:animalId`}
                  component={AnimalEdit}
                />
                <ProtectedRoute
                  exact
                  path={`${match.path}map`}
                  component={MapAdoptions}
                />
                <ProtectedRoute
                  exact
                  path={`${match.path}users`}
                  component={User}
                />
                <ProtectedRoute
                  exact
                  path={`${match.path}user/register`}
                  component={RegisterUser}
                />
                <ProtectedRoute
                  exact
                  path={`${match.path}user/adoptions`}
                  component={Adoptions}
                />
                <ProtectedRoute
                  exact
                  path={`${match.path}master/type-rh`}
                  component={Rh}
                />
                <ProtectedRoute
                  exact
                  path={`${match.path}master/type-breed`}
                  component={Breed}
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

Sidebar.propTypes = {
  match: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Sidebar));
