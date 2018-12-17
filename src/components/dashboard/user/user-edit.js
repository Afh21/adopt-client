import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Redux functions
import { updateProfileFromAdmin } from "../../../redux/actions/users";

// Css
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Row,
  Col,
  Button,
  Card,
  Switch,
  Modal,
  Divider
} from "antd";

const FormItem = Form.Item;
const { Meta } = Card;

class UserEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleTooltip: true,
      visibleTooltipPassword: true,
      visibleChangePassword: false,
      confirmDirty: false,
      validPassword: false
    };
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  // Switch to change the photo perfil
  onChange = () => {
    this.setState({
      visibleTooltip: !this.state.visibleTooltip,
      visibleBottonForUpdateImage: !this.state.visibleBottonForUpdateImage
    });
  };

  // Switch to change the password Input's
  onChangePassword = () => {
    this.setState({
      visibleTooltipPassword: !this.state.visibleTooltipPassword,
      visibleChangePassword: !this.state.visibleChangePassword
    });
  };

  componentDidMount = () => {
    this.props.form.validateFields();
  };

  handleSubmit = e => {
    const { updateProfileFromAdmin } = this.props;
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);

        updateProfileFromAdmin(
          this.props.profile.key,
          values,
          this.props.history
        );

        this.props.communicateToChildEdit(false, {});
      }
    });
  };

  // Validator "password2"
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Las contraseñas son inconsistentes");
    } else {
      this.setState({ validPassword: true });
      callback();
    }
  };

  // Validator "password"
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["password2"], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  handleCancel = () => {
    this.props.communicateToChildEdit(false, {});
  };

  // ================= RENDER ============================
  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const password = isFieldTouched("password") && getFieldError("password");
    const passwordConfirm =
      isFieldTouched("password2") && getFieldError("password2");

    const state = this.state;

    const { profile } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };

    return (
      <div>
        <Modal
          title="Editar Usuario"
          visible={true}
          style={{ top: 20 }}
          okButtonProps={{ hidden: true }}
          maskClosable={false}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col span={24}>
              <Card
                hoverable
                style={{
                  width: 250,
                  textAlign: "center",
                  margin: " 0px auto"
                }}
                cover={<img alt="example" src={profile.avatar} />}
                actions={[
                  profile.rol === "guest" ? (
                    <Tooltip placement="bottom" title="Invitado">
                      <Icon type="idcard" style={{ fontSize: "2em" }} />
                    </Tooltip>
                  ) : (
                    <Tooltip placement="bottom" title="Administrador">
                      <Icon type="crown" style={{ fontSize: "2em" }} />
                    </Tooltip>
                  )
                ]}
              >
                <Meta title={`${profile.name + " " + profile.lastname}  `} />
              </Card>
            </Col>
            <br />
            {/* =========================================  PROFILE ==========================================0 */}
            <Col span={24} style={{ marginTop: "30px" }}>
              <Divider orientation="left"> ** Datos Personales </Divider>
              <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="Nombres">
                  {getFieldDecorator("name", {
                    initialValue: profile.name,
                    rules: [
                      {
                        required: true,
                        message: "Por favor ingresa tus nombres!"
                      }
                    ]
                  })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Apellidos">
                  {getFieldDecorator("lastname", {
                    initialValue: profile.lastname,
                    rules: [
                      {
                        required: true,
                        message: "Por favor ingresa tus apellidos!"
                      }
                    ]
                  })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="E-mail">
                  {getFieldDecorator("email", {
                    initialValue: profile.email
                  })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="N° Identificación">
                  {getFieldDecorator("identity", {
                    initialValue: profile.identity
                  })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Dirección residencia">
                  {getFieldDecorator("address", {
                    initialValue: profile.address
                  })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Teléfono">
                  {getFieldDecorator("phone", {
                    initialValue: profile.phone,
                    rules: [
                      {
                        type: "string",
                        pattern: /^[0-9]+$/,
                        message: "Por favor solo ingrese números."
                      },
                      {
                        min: 7,
                        max: 11,
                        message: "Teléfono min: 7 - max: 11 caracteres"
                      },
                      {
                        required: true,
                        message: "Por favor ingrese tu número telefónico"
                      }
                    ]
                  })(<Input style={{ width: "100%" }} />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Contraseña">
                  <Tooltip
                    placement="right"
                    title="¿Deseas cambiar la contraseña?"
                    visible={state.visibleTooltipPassword}
                  >
                    <Switch onChange={this.onChangePassword} />
                  </Tooltip>
                </FormItem>

                {state.visibleChangePassword ? (
                  <div>
                    <FormItem
                      {...formItemLayout}
                      hasFeedback
                      validateStatus={password ? "error" : ""}
                      label="Nueva contraseña"
                    >
                      {getFieldDecorator("password", {
                        rules: [
                          {
                            validator: this.validateToNextPassword
                          }
                        ]
                      })(<Input type="password" />)}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      hasFeedback
                      validateStatus={passwordConfirm ? "error" : ""}
                      label="Confirmar contraseña"
                    >
                      {getFieldDecorator("password2", {
                        rules: [
                          {
                            validator: this.compareToFirstPassword
                          }
                        ]
                      })(
                        <Input
                          type="password"
                          onBlur={this.handleConfirmBlur}
                        />
                      )}
                    </FormItem>
                  </div>
                ) : null}

                <FormItem {...formItemLayout} style={{ marginTop: 20 }}>
                  <Button
                    htmlType="submit"
                    style={{ marginLeft: "90px" }}
                    icon="edit"
                    disabled={this.hasErrors(getFieldsError())}
                  >
                    Actualizar
                  </Button>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

UserEdit.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  updateProfileFromAdmin: PropTypes.func.isRequired,
  communicateToChildEdit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { updateProfileFromAdmin }
)(Form.create()(UserEdit));
