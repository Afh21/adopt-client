import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { savedTypeRh } from "../../../../redux/actions/settings/typeAction";

// Css
import { Form, Icon, Input, Button } from "antd";
const FormItem = Form.Item;

class TypeRhCreate extends Component {
  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // Add rh
        this.props.savedTypeRh(values);

        // Send component parent (false) for hide form.
        this.props.communicateToChild(false);
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

    // Only show error after a field is touched.
    const rh = isFieldTouched("name") && getFieldError("name");

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem validateStatus={rh ? "error" : ""} help={rh || ""}>
          {getFieldDecorator("name", {
            rules: [
              {
                required: true,
                message: "Por favor ingrese un tipo de rh!"
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="heart" style={{ color: "rgba(0,0,0,.25)" }} />
              }
              placeholder="Tipo de Sangre"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={this.hasErrors(getFieldsError())}
            icon="check"
          >
            Crear Rh
          </Button>
        </FormItem>
      </Form>
    );
  }
}

TypeRhCreate.propType = {
  savedTypeRh: PropTypes.func.isRequired,
  communicateToChild: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  rhs: state.rhs
});

export default connect(
  mapStateToProps,
  { savedTypeRh }
)(Form.create()(TypeRhCreate));
