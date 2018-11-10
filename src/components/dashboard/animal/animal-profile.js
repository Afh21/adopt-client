import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Css
import { Modal } from "antd";

class AnimalProfile extends Component {
  handleCancel = () => {
    // Update to parent
    const { sendToChild } = this.props;
    sendToChild(false, {});
  };

  render() {
    return (
      <div>
        <Modal visible={true} onCancel={this.handleCancel}>
          {" "}
          {JSON.stringify(this.props.data)}
        </Modal>
      </div>
    );
  }
}

AnimalProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  sendToChild: PropTypes.func.isRequired,
  data: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps)(AnimalProfile);
