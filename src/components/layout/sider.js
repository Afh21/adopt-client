import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Redux
// import { connect } from "react-redux";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const MenuLinkSidebar = ({ state, match, rol }) => {
  return (
    <div>
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultOpenKeys={[""]} mode="inline">
          <SubMenu
            key="home"
            title={
              <span>
                <Icon type="home" />
                <span>Home</span>
              </span>
            }
          >
            {rol === "administrator" ? (
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

            {rol === "administrator" ? (
              <Menu.Item key="4">
                <Link to={`${match.url}/animal/register`}>
                  <Icon type="switcher" theme="outlined" />
                  <span>Registro</span>
                </Link>
              </Menu.Item>
            ) : null}
          </SubMenu>

          {rol === "administrator" ? (
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

          {rol === "administrator" ? (
            <SubMenu
              key="settings"
              title={
                <span>
                  <Link to={`${match.url}/settings`}>
                    <Icon type="setting" theme="outlined" />
                    <span>Configuraciones</span>
                  </Link>
                </span>
              }
            >
              <Menu.Item key="9">
                <Link to={`${match.url}/master`}>
                  <Icon type="bars" />
                  <span>Lista General</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="10">
                <Link to={`${match.url}/type/generate/rh`}>
                  <Icon type="heart" theme="outlined" />
                  <span>TIpo Rh</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="11">
                <Link to={`${match.url}/type/generate/breed`}>
                  <Icon type="tag" theme="outlined" />
                  <span>Tipo Raza</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          ) : null}
        </Menu>
      </Sider>
    </div>
  );
};

MenuLinkSidebar.propTypes = {
  state: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  rol: PropTypes.string.isRequired
};

export default withRouter(MenuLinkSidebar);
