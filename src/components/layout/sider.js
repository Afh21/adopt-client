import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const MenuLinkSidebar = ({ state }) => {
  return (
    <div>
      <Sider trigger={null} collapsible collapsed={state.collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultOpenKeys={["home", "animals", "users", "settings"]}
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
            <Menu.Item key="1">
              <Icon type="dashboard" />
              <span>Dashboard</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user" />
              <span>Perfil</span>
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
              <Link to="/dashboard/animals">
                <Icon type="bars" />
                <span>Lista</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="switcher" theme="outlined" />
              <span>Registro</span>
            </Menu.Item>
          </SubMenu>

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
              <Link to="/dashboard/users">
                <Icon type="bars" />
                <span>Lista</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Icon type="user-add" theme="outlined" />
              <span>Registro</span>
            </Menu.Item>
            <Menu.Item key="8">
              <Icon type="audit" theme="outlined" />
              <span>Adopciones</span>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="settings"
            title={
              <span>
                <Icon type="setting" theme="outlined" />
                <span>Configuraciones</span>
              </span>
            }
          >
            <Menu.Item key="9">
              <Icon type="bars" />
              <span>Lista General</span>
            </Menu.Item>
            <Menu.Item key="10">
              <Icon type="heart" theme="outlined" />
              <span>TIpo Rh</span>
            </Menu.Item>
            <Menu.Item key="11">
              <Icon type="tag" theme="outlined" />
              <span>Tipo Raza</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
};

MenuLinkSidebar.propTypes = {
  state: PropTypes.object.isRequired
};

export default MenuLinkSidebar;
