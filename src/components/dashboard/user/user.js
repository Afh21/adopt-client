import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux functions
import {
  getUsersFromAdmin,
  deleteUserFromAdmin
} from "../../../redux/actions/users";

// Redux
import { connect } from "react-redux";

// Css
import { Table, Button, Tag, Spin, Modal } from "antd";
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

class User extends Component {
  constructor(props) {
    super(props);

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

  componentDidMount = () => {
    // Redux - actions
    this.props.getUsersFromAdmin();
  };

  render() {
    // Users - redux
    const { users, loading } = this.props.users;

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
              <Button icon="edit" onClick={() => console.log(record)}>
                Editar
              </Button>

              <Button
                icon="delete"
                className={`${
                  record.key === this.props.auth.user.id ? "disabled" : null
                }`}
                onClick={this.handleDeleteUser.bind(this, record)}
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
        dataArray.push({
          key: user._id,
          name: `${user.name} ${user.lastname}`,
          identity: user.identity,
          phone: user.phone,
          email: user.email,
          rol: user.rol
        });
        return (content = <Table columns={columns} dataSource={dataArray} />);
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
