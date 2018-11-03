import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../redux/actions/authActions";

import { Form, Icon, Input, Button, Divider } from "antd";
const FormItem = Form.Item;

class Login extends Component {
  /*componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
      // console.log("cdm");
    }
  };
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
      // console.log("cwp");
    }
    if (nextProps.error) {
      console.log(nextProps.error.errors);
    }
  }
  */

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginUser(values, this.props.history);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="formContent">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Divider orientation="left"> ** Iniciar Sesión ** </Divider>

          <FormItem label="Correo electrónico">
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: "Por favor ingresa tu correo electrónico"
                },
                {
                  type: "email",
                  message: "Por favor ingresa un email válido"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Correo Electrónico"
                onChange={this.onChange}
              />
            )}
          </FormItem>
          <FormItem label="Contraseña">
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Por favor ingresa tu contraseña" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Contraseña"
                onChange={this.onChange}
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Iniciar Sesión
            </Button>
          </FormItem>

          <Divider orientation="left"> ** ** </Divider>
          <div className="link">
            ó <Link to="/register"> Crear cuenta </Link>
          </div>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Form.create()(Login));
