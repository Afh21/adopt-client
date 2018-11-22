import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

// Actions
import { registerUser } from "../../redux/actions/authActions";

// Design
import { Form, Input, Select, Button, Divider, Icon } from "antd";
import "./auth.css";

const FormItem = Form.Item;
const Option = Select.Option;

class Register extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      values.phone = values.prefix + "" + values.phone;
      values.prefix = "";
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

  render() {
    const { getFieldDecorator } = this.props.form;

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
        <div className="formContent">
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
                    <Icon type="idcard" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Número de identificación"
                />
              )}
            </FormItem>
            <FormItem label="Dirección residencia">
              {getFieldDecorator("address", {
                rules: [
                  {
                    required: true,
                    message: "Por favor ingrese tu número de identificación."
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon
                      type="interation"
                      style={{ color: "rgba(0,0,0,.25)" }}
                    />
                  }
                  placeholder="Ej. CL x # xx - xx "
                />
              )}
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
)(Form.create()(withRouter(Register)));

/*


                <Switch>
                <Route exact path="/profile/:userId" component={null} />

                <Route exact path="/user/register" component={null} />
                <Route exact path="/user/update/:userId" component={null} />
                <Route exact path="/adoptions/" component={null} />
                <Route exact path="/animals/" component={Animal} />
                <Route exact path="/animal/register" component={null} />
                <Route exact path="/animal/update/:animalId" component={null} />
                <Route exact path="/master/" component={null} />
                <Route exact path="/master/type-rh" component={null} />
                <Route exact path="/master/type-rh/register" component={null} />
                <Route
                  exact
                  path="/master/type-rh/update/:typeId"
                  component={null}
                />
                <Route exact path="/master/type-breed" component={null} />
                <Route
                  exact
                  path="/master/type-breed/register"
                  component={null}
                />
                <Route
                  exact
                  path="/master/type-breed/upate/:breedId"
                  component={null}
                />
              </Switch>
*/
