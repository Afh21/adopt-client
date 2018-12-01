import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import {
  getAllTypeRhs,
  deleteTypeRH
} from "../../../../redux/actions/settings/typeAction";

// Components
import TypeRhCreate from "./type-rh-create";

import TypeRhEdit from "./type-rh-edit";

// Css
import { Divider, Button, Table, Spin, Modal } from "antd";
import "../types.css";

const confirm = Modal.confirm;

class TypeRh extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formCreate: false,
      pagination: false,
      visibleEditModal: false,
      dataForEditBreed: {}
    };

    this.handleEditRh = this.handleEditRh.bind(this);
    this.handleDeleteRh = this.handleDeleteRh.bind(this);
  }

  componentDidMount = () => {
    this.props.getAllTypeRhs();
  };

  handleCreateRh = () => {
    this.setState({ formCreate: !this.state.formCreate });
  };

  handleEditRh = e => {
    this.setState({ visibleEditModal: true, dataForEditBreed: e });
  };

  handleDeleteRh = e => {
    const { deleteTypeRH } = this.props;
    // Open modal
    confirm({
      title: `Eliminar rh  - ${e.rh} -`,
      content: "Esto eliminará de forma irreversible el dato!",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        // Action redux
        deleteTypeRH(e.key);
      },
      onCancel() {}
    });
  };

  carryToChildEdit = (bool, object) => {
    this.setState({ visibleEditModal: bool, dataForEditBreed: object });
  };

  carryToChild = bool => {
    this.setState({ formCreate: bool });
  };

  render() {
    let table;
    const { formCreate } = this.state;
    const state = this.state;
    const { rhs, loading } = this.props.rhs;

    const columns = [
      {
        title: "Rh",
        dataIndex: "rh",
        key: "rh"
      },
      {
        title: "",
        key: "action",
        render: item => (
          <span>
            <Button
              className=".ant-btn-edit"
              icon="edit"
              onClick={this.handleEditRh.bind(this, item)}
            >
              {" "}
              Editar
            </Button>
            <Divider type="vertical" />
            <Button
              type="danger"
              ghost
              icon="delete"
              onClick={this.handleDeleteRh.bind(this, item)}
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
    } else if (Object.keys(rhs).length > 0) {
      rhs.map(rh => {
        return data.push({
          key: rh._id,
          rh: rh.name
        });
      });
      table = (
        <Table {...state} columns={columns} dataSource={data} size="small" />
      );
    } else {
      table = <h3>No hay datos para mostrar</h3>;
    }

    return (
      <div>
        <Button onClick={this.handleCreateRh} icon="heart">
          Crear Rh
        </Button>
        <br /> <br />
        {formCreate ? (
          <TypeRhCreate communicateToChild={this.carryToChild} />
        ) : null}
        {state.visibleEditModal ? (
          <TypeRhEdit
            data={state.dataForEditBreed}
            communicateToChildEdit={this.carryToChildEdit}
          />
        ) : null}
        <div className="tableBreed">{table}</div>
      </div>
    );
  }
}

TypeRh.propType = {
  rhs: PropTypes.object.isRequired,
  getAllTypeRhs: PropTypes.func.isRequired,
  deleteTypeRH: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  rhs: state.rhs
});

export default connect(
  mapStateToProps,
  { getAllTypeRhs, deleteTypeRH }
)(TypeRh);
