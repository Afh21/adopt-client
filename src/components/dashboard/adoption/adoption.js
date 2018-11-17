import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { getAdoptions } from "../../../redux/actions/adoption";

// Css
import { Table, Spin, Tag, Button } from "antd";
const ButtonGroup = Button.Group;

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
  handleApproveRequest = event => {};

  // Function bind
  handleRetWeet = e => {
    console.log(e);
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
              <Button icon="check" onClick={this.handleApproveRequest}>
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
          name: adoption.user.name
        });

        return (content = <Table columns={columns} dataSource={data} />);
      });
    }

    return <div>{content}</div>;
  }
}

AdoptionList.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  adoptions: PropTypes.object.isRequired,
  getAdoptions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  adoptions: state.adoptions
});

export default connect(
  mapStateToProps,
  { getAdoptions }
)(AdoptionList);
