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

// Css
import { Switch, Divider, Button, Table, Spin, Modal } from "antd";
import "../types.css";

const confirm = Modal.confirm;

class TypeRh extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formCreate: false,
      pagination: false,
      error: {}
    };

    this.handleDeleteRh = this.handleDeleteRh.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.error).length > 0) {
      this.setState({ error: nextProps.error });
    }
  }

  componentDidMount = () => {
    this.props.getAllTypeRhs();
  };

  handleCreateRh = () => {
    this.setState({ formCreate: !this.state.formCreate });
  };

  handleEditRh = e => {};

  handleDeleteRh = e => {
    const { deleteTypeRH } = this.props;
    confirm({
      title: `Eliminar rh  - ${e.rh} -`,
      content: "Esto eliminará de forma irreversible el dato!",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteTypeRH(e.key);
      },
      onCancel() {}
    });
  };

  render() {
    let table;
    const { formCreate } = this.state;
    const state = this.state;
    const { rhs, loading } = this.props.rhs;

    const { error } = this.state;
    console.log("render error: ", error);

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
        <Switch onClick={this.handleCreateRh} />
        <br /> <br />
        {formCreate ? <TypeRhCreate /> : null}
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
