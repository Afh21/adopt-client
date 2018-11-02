import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import "./dashboard.css";

const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

class Dashboard extends Component {
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
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            // defaultSelectedKeys={["home", "animals", "89"]}
            defaultOpenKeys={["home", "animals"]}
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
                <Icon type="bars" />
                <span>Lista</span>
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
                <Icon type="bars" />
                <span>Lista</span>
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
              minHeight: 600
            }}
          >
            Content
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Powered By Ing. Andres Felipe H. © 2018
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
