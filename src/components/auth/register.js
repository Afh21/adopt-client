import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

// Actions
import { registerUser } from "../../redux/actions/authActions";
import MapGoogle from "../dashboard/map/map-google";

// Design
import { Button, Input, Form, Select, Divider, Icon, Col } from "antd";
const InputGroup = Input.Group;
const FormItem = Form.Item;
const Option = Select.Option;

class Register extends Component {
  state = {
    confirmDirty: false,
    showModalGoogle: false,
    seeCoordsUser: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.phone = values.prefix + "" + values.phone;
      values.prefix = "";
      values.coords = this.state.seeCoordsUser;
      if (!err) {
        this.props.registerUser(values, this.props.history);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  sendToChild = (bool, coords) => {
    this.setState({ showModalGoogle: bool, seeCoordsUser: coords });
  };

  handleShowModalInformattive = () => {
    this.setState({ showModalGoogle: true });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const { seeCoordsUser } = this.state;
    console.log("Register", seeCoordsUser);

    // Select for Form
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "300"
    })(
      <Select style={{ width: 100 }}>
        <Option value="839">+839</Option>
        <Option value="857">+857</Option>
        <Option value="300">+300</Option>
        <Option value="301">+301</Option>
        <Option value="302">+302</Option>
        <Option value="303">+303</Option>
        <Option value="310">+310</Option>
        <Option value="311">+311</Option>
        <Option value="312">+312</Option>
        <Option value="313">+313</Option>
        <Option value="314">+314</Option>
        <Option value="315">+315</Option>
        <Option value="316">+316</Option>
        <Option value="317">+317</Option>
        <Option value="318">+318</Option>
        <Option value="320">+320</Option>
        <Option value="321">+321</Option>
        <Option value="323">+323</Option>
        <Option value="325">+325</Option>
      </Select>
    );

    return (
      <div className="wrapper">
        <div className="formContents">
          <Button type="primary" onClick={this.handleShowModalInformattive}>
            {" "}
            Establecer Dirección!{" "}
          </Button>

          {/* ================================ Google Map ================================ */}
          {this.state.showModalGoogle ? (
            <MapGoogle communicateToChild={this.sendToChild} />
          ) : null}
          <br />
          <br />

          {/* ================================ Formulario Registrar ================================ */}
          {seeCoordsUser.lat && seeCoordsUser.lng ? (
            <Form onClick={this.handleSubmit}>
              <Divider orientation="left"> ** Register **</Divider>
              <FormItem label="Nombres Completos">
                {getFieldDecorator("name", {
                  rules: [
                    {
                      required: true,
                      message: "Por favor ingresa tus nombres completos."
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Nombres completos"
                  />
                )}
              </FormItem>
              <FormItem label="Apellidos Completos">
                {getFieldDecorator("lastname", {
                  rules: [
                    {
                      required: true,
                      message: "Por favor ingresa tus apellidos completos."
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Apellidos completos"
                  />
                )}
              </FormItem>
              <FormItem label="Número Identificación">
                {getFieldDecorator("identity", {
                  rules: [
                    {
                      required: true,
                      message: "Por favor ingrese tu número de identificación."
                    },
                    {
                      type: "string",
                      pattern: /^[0-9]+$/,
                      message: "Por favor solo ingrese números."
                    },
                    {
                      min: 7,
                      max: 11,
                      message:
                        "Número de identificación inválido, min: 7 - max: 11 caracteres"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="idcard"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    placeholder="Número de identificación"
                  />
                )}
              </FormItem>
              <FormItem label="Dirección de residencia">
                {getFieldDecorator("address", {
                  rules: [
                    {
                      required: true,
                      message: "Por favor ingrese tu dirección de residencia."
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="pushpin"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    placeholder="Dirección de residencia"
                  />
                )}
              </FormItem>
              <FormItem label="Coordenadas">
                <InputGroup>
                  <Col span={12}>
                    <Input defaultValue={seeCoordsUser.lat} readOnly />
                  </Col>
                  <Col span={12}>
                    <Input defaultValue={seeCoordsUser.lng} readOnly />
                  </Col>
                </InputGroup>
              </FormItem>
              <FormItem label="Correo electrónico">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "Por favor ingresa un correo electrónico válido."
                    },
                    {
                      required: true,
                      message: "Por favor ingresa tu correo electrónico."
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="solution"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    placeholder="Correo electrónico"
                  />
                )}
              </FormItem>
              <FormItem label="Contraseña">
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Por favor introduzca una contraseña"
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(
                  <Input
                    type="password"
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Contraseña, min 8 caracteres"
                  />
                )}
              </FormItem>
              <FormItem label="Confirmar contraseña">
                {getFieldDecorator("password2", {
                  rules: [
                    {
                      required: true,
                      message: "Por favor confirme tu contraseña"
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(
                  <Input
                    type="password"
                    onBlur={this.handleConfirmBlur}
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Contraseña, min 8 caracteres"
                  />
                )}
              </FormItem>
              <FormItem label="Número telefónico">
                {getFieldDecorator("phone", {
                  rules: [
                    {
                      required: true,
                      message: "Por favor introduzca tu número de celular"
                    }
                  ]
                })(
                  <Input
                    addonBefore={prefixSelector}
                    style={{ width: "100%" }}
                    prefix={
                      <Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Teléfono (Fijo) ó (Celular)"
                  />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">
                  Registrarse
                </Button>
              </FormItem>
              <Divider orientation="left"> ** **</Divider>
              Ya tienes una cuenta. <Link to="/login"> Inicia Sesión </Link>
            </Form>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Form.create()(Register)));
