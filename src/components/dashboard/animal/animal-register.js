import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Redux
import { savedAnimal } from "../../../redux/actions/animals";
import {
  getAllTypeBreeds,
  getAllTypeRhs
} from "../../../redux/actions/settings/typeAction";

// Css
import { Form, Icon, Input, Button, Select, DatePicker, Divider } from "antd";
import "./animal.css";
const Option = Select.Option;
const FormItem = Form.Item;

class RegisterAnimal extends Component {
  // Form.create
  hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  // Lifecycle react
  componentDidMount() {
    const { getAllTypeBreeds, getAllTypeRhs } = this.props;

    // To disabled submit button at the beginning.
    this.props.form.validateFields();

    // Actions redux
    getAllTypeBreeds();
    getAllTypeRhs();
  }

  // Send info
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // Redux function
        this.props.savedAnimal(values, this.props.history);
      }
    });
  };

  render() {
    // Form.create()
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Redux props
    const { breeds, rhs } = this.props;

    // Only show error after a field is touched.
    const name = isFieldTouched("name") && getFieldError("name");
    const animal = isFieldTouched("animal") && getFieldError("animal");
    const rh = isFieldTouched("rh") && getFieldError("rh");
    const breed = isFieldTouched("breed") && getFieldError("breed");
    const genre = isFieldTouched("genre") && getFieldError("genre");
    const color = isFieldTouched("color") && getFieldError("color");
    const height = isFieldTouched("height") && getFieldError("height");
    const weight = isFieldTouched("weight") && getFieldError("weight");
    const born = isFieldTouched("born") && getFieldError("born");
    const state = isFieldTouched("state") && getFieldError("state");

    return (
      <div className="">
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Divider orientation="left">** Registrar animal</Divider>
          <FormItem
            label="Nombre del animal"
            validateStatus={name ? "error" : ""}
            help={name || ""}
          >
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Por favor ingrese el nombre del animal"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Nombre del animal"
              />
            )}
          </FormItem>

          <FormItem
            label="Animal"
            validateStatus={animal ? "error" : ""}
            help={animal || ""}
          >
            {getFieldDecorator("animal", {
              rules: [
                {
                  required: true,
                  message: "Por favor seleccione tipo de animal"
                }
              ]
            })(
              <Select placeholder="Tipo de animal">
                <Option value="dog">Perro</Option>
                <Option value="cat">Gato</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            label="Rh"
            validateStatus={rh ? "error" : ""}
            help={rh || ""}
          >
            {getFieldDecorator("rh", {
              rules: [
                {
                  required: true,
                  message: "Por favor seleccione el tipo de sangre"
                }
              ]
            })(
              <Select placeholder="Tipo de rh">
                {rhs.rhs.map((rh, index) => (
                  <Option
                    style={{ textTransform: "capitalize" }}
                    key={index}
                    value={`${rh._id}`}
                  >{`${rh.name}`}</Option>
                ))}
              </Select>
            )}
          </FormItem>

          <FormItem
            label="Raza"
            validateStatus={breed ? "error" : ""}
            help={breed || ""}
          >
            {getFieldDecorator("breed", {
              rules: [
                {
                  required: true,
                  message: "Por favor seleccione la raza"
                }
              ]
            })(
              <Select placeholder="Tipo de raza">
                {breeds.breeds.map((breed, index) => (
                  <Option
                    style={{ textTransform: "capitalize" }}
                    key={index}
                    value={`${breed._id}`}
                  >{`${breed.name}`}</Option>
                ))}
              </Select>
            )}
          </FormItem>

          <FormItem
            label="Género"
            validateStatus={genre ? "error" : ""}
            help={genre || ""}
          >
            {getFieldDecorator("genre", {
              rules: [
                {
                  required: true,
                  message: "Por favor seleccione tipo de género"
                }
              ]
            })(
              <Select placeholder="Tipo de género">
                <Option value="male">Macho</Option>
                <Option value="female">Hembra</Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            label="Color"
            validateStatus={color ? "error" : ""}
            help={color || ""}
          >
            {getFieldDecorator("color", {
              rules: [
                {
                  required: true,
                  message: "Por favor ingrese el color del animal"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="highlight" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Color del animal"
              />
            )}
          </FormItem>

          <FormItem
            label="Altura del animal"
            validateStatus={height ? "error" : ""}
            help={height || ""}
          >
            {getFieldDecorator("height", {
              rules: [
                {
                  required: true,
                  message: "Por favor ingrese la altura del animal"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon
                    type="colum-height"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                addonAfter="cm"
                placeholder="Altura del animal"
              />
            )}
          </FormItem>

          <FormItem
            label="Peso del animal"
            validateStatus={weight ? "error" : ""}
            help={weight || ""}
          >
            {getFieldDecorator("weight", {
              rules: [
                {
                  required: true,
                  message: "Por favor ingrese el peso del animal."
                }
              ]
            })(
              <Input
                prefix={
                  <Icon
                    type="colum-height"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                addonAfter="kg"
                placeholder="Peso del animal"
              />
            )}
          </FormItem>

          <FormItem
            label="Fecha de nacimiento"
            validateStatus={born ? "error" : ""}
            help={born || ""}
          >
            {getFieldDecorator("born", {
              rules: [
                {
                  required: true,
                  message: "Por favor ingrese el peso del animal."
                }
              ]
            })(<DatePicker />)}
          </FormItem>

          <FormItem
            label="Estado "
            validateStatus={state ? "error" : ""}
            help={state || ""}
          >
            {getFieldDecorator("state", {
              rules: [
                {
                  required: true,
                  message: "Por favor seleccione el estado del animal"
                }
              ]
            })(
              <Select placeholder="Estado del animal">
                <Option value="healthy">Saludable</Option>
                <Option value="Sick">Enfermo</Option>
              </Select>
            )}
          </FormItem>

          <Divider> </Divider>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={this.hasErrors(getFieldsError())}
              icon="form"
            >
              Registrar
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

RegisterAnimal.propTypes = {
  getAllTypeBreeds: PropTypes.func.isRequired,
  getAllTypeRhs: PropTypes.func.isRequired,
  savedAnimal: PropTypes.func.isRequired,
  animals: PropTypes.object.isRequired,
  breeds: PropTypes.object.isRequired,
  rhs: PropTypes.object.isRequired,
  auth: PropTypes.object,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  rhs: state.rhs,
  breeds: state.breeds,
  animals: state.animals
});

export default connect(
  mapStateToProps,
  { getAllTypeBreeds, getAllTypeRhs, savedAnimal }
)(Form.create()(RegisterAnimal));
