import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Functions Redux
import { getAllTypeBreeds } from "../../../redux/actions/settings/typeAction";

// Antd & Styles
import { Table, Divider, Tag, Button, Icon } from "antd";
import "./types.css";

class Breed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: false
    };

    this.handleEditBreed = this.handleEditBreed.bind(this);
    this.handleDeleteBreed = this.handleDeleteBreed.bind(this);
  }

  handleEditBreed = e => {
    console.log("Edit breed: ", e);
  };

  handleDeleteBreed = e => {
    console.log("Delete breed: ", e);
  };

  componentDidMount = () => {
    this.props.getAllTypeBreeds();
  };

  render() {
    let table;
    const state = this.state;
    const { breeds } = this.props.breeds;

    const columns = [
      {
        title: "Raza",
        dataIndex: "breed",
        key: "breed"
      },
      {
        title: "",
        key: "action",
        render: item => (
          <span>
            <Button
              className="buttonEdit"
              icon="edit"
              onClick={this.handleEditBreed.bind(this, item)}
            >
              {" "}
              Editar
            </Button>
            <Divider type="vertical" />
            <Button
              type="danger"
              ghost
              icon="delete"
              onClick={this.handleDeleteBreed.bind(this, item)}
            >
              {" "}
              Eliminar{" "}
            </Button>
          </span>
        )
      }
    ];
    const data = [];

    if (breeds.length > 0) {
      breeds.map(breed => {
        return data.push({
          key: breed._id,
          breed: breed.name
        });
      });
      table = <Table {...state} columns={columns} dataSource={data} />;
    } else {
      table = "No hay datos para mostrar!";
    }

    return <div className="tableBreed">{table}</div>;
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
  breeds: state.breeds
});

export default connect(
  mapStateToProps,
  { getAllTypeBreeds }
)(Breed);
