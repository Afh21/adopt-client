import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Menu, Icon, Button } from "antd";

class Navbar extends Component {
  state = {
    current: "home"
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
        >
          <Menu.Item key="home">
            <Button ghost type="primary">
              <Link to="/">
                <Icon type="home" />
                Home
              </Link>
            </Button>
          </Menu.Item>

          <Menu.Item key="open">
            <Icon type="unlock" />
            Iniciar Sesión
          </Menu.Item>

          <Menu.Item key="register">
            <Link to="/register">
              <Icon type="link" />
              Registrarse
            </Link>
          </Menu.Item>

          <Menu.Item key="dashboard">
            <Link to="/dashboard">
              <Icon type="dashboard" />
              Dashboard
            </Link>
          </Menu.Item>

          <Menu.Item key="close">
            <Icon type="lock" />
            Cerrar Sesión
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
