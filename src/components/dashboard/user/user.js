import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux functions
import {
  getUsersFromAdmin,
  deleteUserFromAdmin
} from "../../../redux/actions/users";

// Redux
import { connect } from "react-redux";

import UserEdit from "./user-edit";

// Css
import { Table, Button, Tag, Spin, Modal } from "antd";
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleEditProfile: false,
      objectUserUpdate: {}
    };

    this.handleEditUser = this.handleEditUser.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  handleDeleteUser = user => {
    const { deleteUserFromAdmin } = this.props;
    confirm({
      title: `Estás a punto de eliminar a - '${user.name}' `,
      content: "No hay reversa para esta acción!",
      okText: "Confirmar!",
      okType: "danger",
      cancelText: "Cancelar!",
      onOk() {
        deleteUserFromAdmin(user.key);
      },
      onCancel() {}
    });
  };

  handleEditUser = user => {
    this.setState({
      visibleEditProfile: true,
      objectUserUpdate: user
    });
  };

  carryToChildEdit = (bool, object) => {
    this.setState({ visibleEditProfile: bool, objectUserUpdate: object });
  };

  componentDidMount = () => {
    // Redux - actions
    this.props.getUsersFromAdmin();
  };

  render() {
    // Users - redux
    const { users, loading } = this.props.users;
    const state = this.state;

    const columns = [
      {
        title: "Nombres y apellidos",
        dataIndex: "name"
      },
      {
        title: "Identificación",
        dataIndex: "identity"
      },
      {
        title: "Teléfono",
        dataIndex: "phone"
      },
      {
        title: "Correo electrónico",
        dataIndex: "email"
      },
      {
        title: "Residencia",
        dataIndex: "address"
      },
      {
        title: "Coordenadas",
        dataIndex: "coords"
      },
      {
        title: "Rol",
        dataIndex: "rol",
        render: text =>
          text === "administrator" ? (
            <Tag color="green"> Administrador </Tag>
          ) : (
            <Tag color="red"> Invitado </Tag>
          ),
        filters: [
          {
            text: "Invitado",
            value: "guest"
          },
          {
            text: "Administrador",
            value: "administrator"
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.rol.indexOf(value) === 0,
        sorter: (a, b) => a.rol.length - b.rol.length
      },
      {
        title: "Acciones",
        dataIndex: "actions",
        render: (text, record) => (
          <span>
            <ButtonGroup size="default">
              <Button
                icon="edit"
                onClick={this.handleEditUser.bind(this, record)}
              >
                Editar
              </Button>

              <Button
                icon="delete"
                className={`${
                  record.key === this.props.auth.user.id ? "disabled" : null
                }`}
                onClick={
                  record.key === this.props.auth.user.id
                    ? null
                    : this.handleDeleteUser.bind(this, record)
                }
              >
                Eliminar
              </Button>
            </ButtonGroup>
          </span>
        )
      }
    ];

    const dataArray = [];
    let content;

    if (loading) {
      content = <Spin size="large" />;
    } else if (users.data) {
      users.data.map(user => {
        let coordsT = Object.assign({}, user.coords);
        let coords = "";

        let coordS = Object.values(coordsT).map(cord => Object.values(cord));

        if (coordS[0] && coordS[1]) {
          coords = "Lat:  " + coordS[0] + " -   Lng:  " + coordS[1];
        } else {
          coords = "No proporciona coordenadas";
        }

        dataArray.push({
          key: user._id,
          name: user.name,
          lastname: user.lastname,
          identity: user.identity,
          phone: user.phone,
          email: user.email,
          avatar: user.avatar,
          address: user.address,
          coords: coords,
          birthday: user.birthday,
          rol: user.rol
        });
        return (content = (
          <Table
            columns={columns}
            dataSource={dataArray}
            scroll={{ x: 1600 }}
          />
        ));
      });
    }

    return (
      <div>
        <Button
          icon="form"
          onClick={() => this.props.history.push("/dashboard/user/register")}
        >
          {" "}
          Crear administrador !{" "}
        </Button>
        {content}
        {state.visibleEditProfile ? (
          <UserEdit
            profile={state.objectUserUpdate}
            communicateToChildEdit={this.carryToChildEdit}
          />
        ) : null}
      </div>
    );
  }
}

User.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUsersFromAdmin, deleteUserFromAdmin }
)(User);
