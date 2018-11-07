import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Functions Redux
import {
  getAllTypeBreeds,
  deleteTypeBreed
} from "../../../../redux/actions/settings/typeAction";

// Components
import TypeBreedCreate from "./type-breed-create";

// Antd & Styles
import { Table, Divider, Button, Modal, Spin } from "antd";
import "../types.css";

const confirm = Modal.confirm;

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
    console.log("Edit breed: ", e.key);
  };

  handleDeleteBreed = e => {
    const { deleteTypeBreed } = this.props;
    confirm({
      title: `Estas seguro de eliminar esta raza - ${e.breed} -`,
      content: "Esto eliminará de forma irreversible el dato!",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteTypeBreed(e.key);
      },
      onCancel() {}
    });
  };

  /*    
      notification.open({
        message: "Ups!",
        description: "Algo sucedió al crear la raza, verifica por favor!",
        icon: <Icon type="frown" style={{ color: "#108ee9" }} />
      });    
    */

  componentDidMount = () => {
    this.props.getAllTypeBreeds();
  };

  render() {
    let table;
    const state = this.state;
    const { breeds, loading } = this.props.breeds;

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
              className=".ant-btn-edit"
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

    if (loading) {
      table = <Spin size="large" />;
    } else if (Object.keys(breeds).length > 0) {
      breeds.map(breed => {
        return data.push({
          key: breed._id,
          breed: breed.name
        });
      });
      table = (
        <Table {...state} columns={columns} dataSource={data} size="small" />
      );
    } else {
      table = <h3>No hay datos para mostrar</h3>;
    }

    return (
      <div className="">
        <TypeBreedCreate />
        <div className="tableBreed">{table}</div>
      </div>
    );
  }
}

Breed.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  breeds: PropTypes.object.isRequired,
  getAllTypeBreeds: PropTypes.func.isRequired,
  deleteTypeBreed: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  breeds: state.breeds
});

export default connect(
  mapStateToProps,
  { getAllTypeBreeds, deleteTypeBreed }
)(Breed);
