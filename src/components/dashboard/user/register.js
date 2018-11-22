import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Actions
import { createUserFromAdmin } from "../../../redux/actions/users";

// Design
import { Form, Input, Select, Button, Divider, Icon } from "antd";
import "./../../../components/dashboard/animal/animal.css";
import "../../../components/auth/auth.css";

const FormItem = Form.Item;
const Option = Select.Option;

class RegisterAdmin extends Component {
  state = {
    confirmDirty: false
  };

  // Form.create
  hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  // Lifecycle react
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  // Send info
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.phone = values.prefix + "" + values.phone;
      values.rol = "administrator";
      values.prefix = "";

      if (!err) {
        // Redux function
        this.props.createUserFromAdmin(values, this.props.history);
      }
    });
  };

  // Validate form
  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  // Validate form
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Las contraseñas no concuerdan, verifica! ");
    } else {
      callback();
    }
  };

  // Validate form
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    // Form.create()
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

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

    // Only show error after a field is touched.
    const name = isFieldTouched("name") && getFieldError("name");
    const lastname = isFieldTouched("lastname") && getFieldError("lastname");
    const identity = isFieldTouched("identity") && getFieldError("identity");
    const address = isFieldTouched("address") && getFieldError("address");
    const email = isFieldTouched("email") && getFieldError("email");
    const password = isFieldTouched("password") && getFieldError("password");
    const password2 = isFieldTouched("password2") && getFieldError("password2");
    const phone = isFieldTouched("phone") && getFieldError("phone");

    return (
      <div className="wrapper">
        <Form onClick={this.handleSubmit}>
          <Divider orientation="left"> ** Registrar administrador **</Divider>
          <FormItem
            label="Nombres Completos"
            validateStatus={name ? "error" : ""}
            help={name || ""}
          >
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
          <FormItem
            label="Apellidos Completos"
            validateStatus={lastname ? "error" : ""}
            help={lastname || ""}
          >
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
          <FormItem
            label="Número Identificación"
            validateStatus={identity ? "error" : ""}
            help={identity || ""}
          >
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
                  <Icon type="idcard" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Número de identificación"
              />
            )}
          </FormItem>
          <FormItem
            label="Dirección residencia"
            validateStatus={address ? "error" : ""}
            help={address || ""}
          >
            {getFieldDecorator("address", {
              rules: [
                {
                  required: true,
                  message: "Por favor ingresa tu dirección de residencia."
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="solution" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Dirección de residencia"
              />
            )}
          </FormItem>
          <FormItem
            label="Correo electrónico"
            validateStatus={email ? "error" : ""}
            help={email || ""}
          >
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
                  <Icon type="solution" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Correo electrónico"
              />
            )}
          </FormItem>
          <FormItem
            label="Contraseña"
            validateStatus={password ? "error" : ""}
            help={password || ""}
          >
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
          <FormItem
            label="Confirmar contraseña"
            validateStatus={password2 ? "error" : ""}
            help={password2 || ""}
          >
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
          <FormItem
            label="Número telefónico"
            validateStatus={phone ? "error" : ""}
            help={phone || ""}
          >
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
          <Divider orientation="left"> </Divider>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              icon="form"
              disabled={this.hasErrors(getFieldsError())}
            >
              Registrar
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

RegisterAdmin.propTypes = {
  createUserFromAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { createUserFromAdmin }
)(Form.create()(withRouter(RegisterAdmin)));
