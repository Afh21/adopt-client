import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { savedTypeBreed } from "../../../../redux/actions/settings/typeAction";

//  Css
import { Modal, Button, Form, Input, Icon } from "antd";
const FormItem = Form.Item;

class TypeBreedCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      confirmLoading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.error) {
      console.log(nextProps.error);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.savedTypeBreed(values);
      }
    });
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleOk = e => {
    this.setState({ visible: false, confirmLoading: true });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 4000);
  };

  handleCancel = e => {
    this.setState({ visible: false });
    const { form } = this.props;
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Crear raza
        </Button>
        <Modal
          title="Creación tipo de raza!"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel} icon="close">
              {" "}
              Cancelar
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={this.handleSubmit}
              icon="form"
            >
              Guardar
            </Button>
          ]}
        >
          <Form>
            <FormItem>
              {getFieldDecorator("name", {
                rules: [
                  {
                    type: "string",
                    // pattern: /^[a-z](?!\s*$).+/,
                    message: "Raza debe ser escrito en minúsculo!"
                  },
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
          </Form>
        </Modal>
      </div>
    );
  }
}

TypeBreedCreate.propType = {
  error: PropTypes.object.isRequired,
  savedTypeBreed: PropTypes.func.isRequired
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
