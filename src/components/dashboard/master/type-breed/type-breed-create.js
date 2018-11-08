import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { savedTypeBreed } from "../../../../redux/actions/settings/typeAction";

//  Css
import { Button, Form, Input, Icon } from "antd";
const FormItem = Form.Item;

class TypeBreedCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmLoading: false
    };
  }

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    const { communicateToChild } = this.props;

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // Save
        this.props.savedTypeBreed(values);

        // Send to false to Parent Component for hide the form
        communicateToChild(false);
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
    const breed = isFieldTouched("name") && getFieldError("name");

    return (
      <div>
        <br />
        <Form onSubmit={this.handleSubmit} layout="inline">
          <FormItem validateStatus={breed ? "error" : ""} help={breed || ""}>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Por favor ingrese una raza!"
                }
              ]
            })(
              <Input
                placeholder="Nombre de la raza"
                prefix={
                  <Icon type="tag" style={{ color: "rgba(0,0,0,.25)" }} />
                }
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              icon="check"
              disabled={this.hasErrors(getFieldsError())}
              onClick={this.carryToParent}
            >
              Crear Raza
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

TypeBreedCreate.propType = {
  error: PropTypes.object.isRequired,
  savedTypeBreed: PropTypes.func.isRequired,
  communicateToChild: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  breeds: state.breeds
});

export default connect(
  mapStateToProps,
  { savedTypeBreed }
)(Form.create()(TypeBreedCreate));
