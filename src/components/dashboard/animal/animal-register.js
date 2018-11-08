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
import { Form, Icon, Input, Button, Select } from "antd";
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    const { breeds, rhs } = this.props;

    // Only show error after a field is touched.
    const name = isFieldTouched("name") && getFieldError("name");
    const animal = isFieldTouched("animal") && getFieldError("animal");
    const breed = isFieldTouched("breed") && getFieldError("breed");

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
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
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
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
          label="breed"
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
