import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllTypeBreeds } from "../../../redux/actions/settings/typeAction";
import PropTypes from "prop-types";

class Breed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allRhs: []
    };
  }

  // componentDidMount = () => {};

  render() {
    return (
      <div>
        <h3> Settings / Master / Type-Breed </h3>
      </div>
    );
  }
}

Breed.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  breeds: PropTypes.object.isRequired,
  getAllTypeBreeds: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  breeds: state.rhs
});

export default connect(
  mapStateToProps,
  { getAllTypeBreeds }
)(Breed);
