import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Form, Input, Button, Modal, Icon } from "antd";

import { updateRh } from "../../../../redux/actions/settings/typeAction";

const FormItem = Form.Item;

class TypeRhEdit extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        // Save
        this.props.updateRh(this.props.data.key, values);
        this.props.communicateToChildEdit(false, {});
      }
    });
  };

  handleCancel = () => {
    this.props.communicateToChildEdit(false, {});
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Modal
          title={`Actualizar tipo de sangre - ${this.props.data.rh} -`}
          visible={true}
          okButtonProps={{ hidden: true }}
          maskClosable={false}
          onCancel={this.handleCancel}
        >
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem label="Nombre: ">
              {getFieldDecorator("name", {
                initialValue: this.props.data.rh,
                rules: [
                  {
                    required: true,
                    message: "Por favor ingrese un tipo de sangre!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="tag" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              )}
            </FormItem>
            <FormItem>
              <Button htmlType="submit" key="submit" icon="edit">
                Actualizar
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

TypeRhEdit.propTypes = {
  data: PropTypes.object.isRequired,
  communicateToChildEdit: PropTypes.func.isRequired,
  updateRh: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { updateRh }
)(Form.create()(TypeRhEdit));
