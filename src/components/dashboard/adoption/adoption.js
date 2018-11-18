import React, { Component } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import {
  getAdoptions,
  acceptAdoption,
  deleteAdoption
} from "../../../redux/actions/adoption";

// Css
import {
  Table,
  Spin,
  Tag,
  Button,
  Tooltip,
  Avatar,
  Modal,
  Divider
} from "antd";
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

class AdoptionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      row: ""
    };

    this.handleApproveRequest = this.handleApproveRequest.bind(this);
    this.handleRetWeet = this.handleRetWeet.bind(this);
  } // End constructor

  // Function bind
  handleApproveRequest = data => {
    this.props.acceptAdoption(data.key);
  };

  // Function bind
  handleRetWeet = e => {
    const { deleteAdoption } = this.props;
    if (e.state.toString() !== "true") {
      return Modal.info({
        title: "Ups!",
        content: (
          <div>
            <p>Primero debes aprovar las solicitudes de adopción</p>
          </div>
        ),
        onOk() {}
      });
    }

    // Reversar la adopcion.
    confirm({
      title: "Vas a reversar esta adopcion",
      content:
        "Una vez reprovada, el animal estará disponible para su adopcion nuevamente!",
      okText: "Estoy de acuerdo!",
      okType: "danger",
      cancelText: "Cancelar!",
      onOk() {
        deleteAdoption(e.key);
      },
      onCancel() {}
    });
  };

  // Lifecycle
  componentDidMount = () => {
    this.props.getAdoptions();
  };

  // Posible solucion a cada fila, y es que si "confirm" es true, entonces el boton se habilita para reversar la decision

  render() {
    const { adoptions, loading } = this.props.adoptions;
    let content;
    let data = [];
    const columns = [
      {
        title: "Avatar",
        dataIndex: "avatar",
        fixed: "left",
        render: text => <Avatar shape="square" size={64} src={text} />
      },
      {
        title: "Nombres y apellidos",
        dataIndex: "name",
        fixed: "left"
      },
      {
        title: "N° Identidad",
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
        title: "Fecha solicitud",
        dataIndex: "date",
        render: text => (
          <Tooltip placement="bottomLeft" title="Dia - Mes - Año">
            <Moment date={text} format="DD-MM-YYYY" />{" "}
          </Tooltip>
        )
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
        title: "Nombre animal",
        dataIndex: "animal",
        render: text => <Tag size="large">{text}</Tag>
      },
      {
        title: "Tipo de animal",
        dataIndex: "type",
        render: text => (text === "dog" ? <Tag>Perro</Tag> : <Tag>Gato</Tag>)
      },
      {
        title: "Estado adopción",
        dataIndex: "state",
        render: text =>
          text.toString() === "false" ? (
            <Tag color="red"> Pendiente</Tag>
          ) : (
            <Tag color="green"> Aprovada </Tag>
          )
      },
      {
        title: "Acciones",
        dataIndex: "actions",
        fixed: "right",
        render: (text, record) => (
          <span>
            <ButtonGroup size="default">
              <Button
                icon="check"
                onClick={this.handleApproveRequest.bind(this, record)}
              >
                Aprovar
              </Button>
              <Button
                icon="retweet"
                onClick={this.handleRetWeet.bind(this, record)}
              >
                Reversar
              </Button>
            </ButtonGroup>
          </span>
        )
      }
    ];

    if (loading) {
      content = <Spin size="large" />;
    } else if (adoptions.length) {
      adoptions.map(adoption => {
        data.push({
          key: adoption._id,
          avatar: adoption.user.avatar,
          name: adoption.user.name + " " + adoption.user.lastname,
          identity: adoption.user.identity,
          phone: adoption.user.phone,
          email: adoption.user.email,
          date: adoption.createdAt,
          rol: adoption.user.rol,
          animal: adoption.animal.name,
          type: adoption.animal.animal,
          state: adoption.confirmed
        });

        return (content = (
          <Table columns={columns} dataSource={data} scroll={{ x: 1600 }} />
        ));
      });
    } else {
      content = (
        <div>
          {" "}
          <Divider orientation="left">Lista de Adopciones </Divider> No hay
          solicitudes de adopcion generadas.{" "}
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

AdoptionList.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  adoptions: PropTypes.object.isRequired,
  getAdoptions: PropTypes.func.isRequired,
  acceptAdoption: PropTypes.func.isRequired,
  deleteAdoption: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  adoptions: state.adoptions
});

export default connect(
  mapStateToProps,
  { getAdoptions, acceptAdoption, deleteAdoption }
)(AdoptionList);
