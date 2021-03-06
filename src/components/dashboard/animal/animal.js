import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

// Css
import {
  List,
  Avatar,
  Button,
  Spin,
  Tag,
  Icon,
  Divider,
  Tooltip,
  Modal
} from "antd";

// Redux
import { connect } from "react-redux";
import {
  getAnimals,
  deleteAnimal,
  adoptAnimal,
  getListAnimalsAdoptedAndPending
} from "../../../redux/actions/animals";

import "./animal.css";
import AnimalProfile from "./animal-profile";
import AnimalPendingAdopted from "./animal-pending-adopted";

const confirm = Modal.confirm;

class Animal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleProfile: false,
      modalListAnimals: false,
      profileAnimal: {},
      listAnimalsAdoptedAndPending: []
    };

    // Bind function to handleProfile
    this.handleProfile = this.handleProfile.bind(this);
    this.handleDeleteAnimal = this.handleDeleteAnimal.bind(this);
    this.handleAdopt = this.handleAdopt.bind(this);
  }

  // Looking for a profile
  handleProfile = e => {
    this.setState({
      visibleProfile: !this.state.visibleProfile,
      profileAnimal: e
    });
  };

  // Send info to child component
  carryToChild = (bool, profile) => {
    this.setState({
      visibleProfile: bool,
      profileAnimal: profile
    });
  };

  // Send info to child component
  carryToChildList = bool => {
    this.setState({
      modalListAnimals: bool
    });
  };

  handleDeleteAnimal = e => {
    const { deleteAnimal } = this.props;
    confirm({
      title: `Estás a punto de eliminar a - '${e.name}' `,
      content: "No hay reversa para esta acción!",
      okText: "Confirmar!",
      okType: "danger",
      cancelText: "Cancelar!",
      onOk() {
        deleteAnimal(e.id);
      },
      onCancel() {}
    });
  };

  handleAdopt = e => {
    const { adoptAnimal } = this.props;
    confirm({
      title: `Estás a punto de adoptar a - '${e.name}' `,
      content: "Dale amor y el mejor hogar a este animal.",
      okText: "Confirmar!",
      cancelText: "Cancelar!",
      onOk() {
        adoptAnimal(e.id);
      },
      onCancel() {}
    });
  };

  // Lifecycle hook
  componentDidMount = () => {
    // Redux function
    this.props.getAnimals();
    this.props.getListAnimalsAdoptedAndPending();
  };

  handleAnimalsAdoptedAndPending = () => {
    this.setState({
      modalListAnimals: true,
      listAnimalsAdoptedAndPending: this.props.animals.listAnimals
    });
  };

  render() {
    const {
      visibleProfile,
      profileAnimal,
      modalListAnimals,
      listAnimalsAdoptedAndPending
    } = this.state;
    const { user } = this.props.auth;

    const { animals, loading } = this.props.animals;
    const data = [];
    let content;

    if (loading) {
      content = <Spin />;
    } else if (animals.length > 0) {
      animals.map(animal => {
        data.push({
          id: animal._id,
          name: animal.name,
          animal: animal.animal,
          genre: animal.genre,
          state: animal.state,
          breed: animal.breed,
          rh: animal.rh,
          height: animal.height,
          weight: animal.weight,
          born: animal.born,
          age: animal.age,
          typeHeight: animal.typeHeight,
          typeWeight: animal.typeWeight,
          image: animal.image
        });

        return (content = (
          <List
            itemLayout="vertical"
            style={{ width: 800 }}
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 3
            }}
            dataSource={data}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <Button
                    icon="solution"
                    onClick={this.handleProfile.bind(this, item)}
                  >
                    {" "}
                    Perfil{" "}
                  </Button>,
                  <Button
                    type="primary"
                    ghost
                    icon="info-circle"
                    onClick={this.handleAdopt.bind(this, item)}
                  >
                    {" "}
                    Adoptame{" "}
                  </Button>,
                  user.rol === "administrator" ? (
                    <Button
                      type="danger"
                      ghost
                      onClick={this.handleDeleteAnimal.bind(this, item)}
                      icon="delete"
                    >
                      {" "}
                      Eliminar
                    </Button>
                  ) : null,
                  user.rol === "administrator" ? (
                    <Link to={`animal/edit/${item.id}`}>
                      <Button type="default" icon="edit">
                        {" "}
                        Editar
                      </Button>
                    </Link>
                  ) : null
                ]}
                extra={
                  <img
                    alt="image_animal"
                    src={
                      item.image === null
                        ? "http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png"
                        : "http://localhost:5000" + item.image
                    }
                    style={{ borderRadius: 8, height: 130, width: 200 }}
                  />
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={
                    <p style={{ textTransform: "uppercase" }}>{item.name}</p>
                  }
                  description={""}
                />
                <Tag>{item.animal === "dog" ? "Perro" : "Gato"}</Tag>

                <Tooltip title={"Raza"}>
                  <Tag style={{ textTransform: "capitalize" }}>
                    {item.breed.name}
                  </Tag>
                </Tooltip>

                <Tooltip
                  title={`${item.genre === "male" ? "Macho " : "Hembra"}`}
                >
                  <Tag>
                    {item.genre === "male" ? (
                      <Icon type="man" />
                    ) : (
                      <Icon type="woman" />
                    )}
                  </Tag>
                </Tooltip>

                <Tooltip
                  title={`${
                    item.state === "healthy" ? "Saludable" : "Enfermo"
                  }`}
                >
                  <Tag>
                    {item.state === "healthy" ? (
                      <Icon type="heart" />
                    ) : (
                      <Icon type="frown" />
                    )}
                  </Tag>
                </Tooltip>
              </List.Item>
            )}
          />
        ));
      });
    } else {
      content = "No hay animales disponibles para adoptar";
    }

    return (
      <div className="animalList">
        {this.props.auth.user.rol === "administrator" ? (
          <React.Fragment>
            <div style={{ marginBottom: "50px" }}>
              <Button
                icon="form"
                onClick={() =>
                  this.props.history.push("/dashboard/animal/register")
                }
              >
                Crear Animal
              </Button>

              <Button
                icon="bars"
                style={{ float: "right" }}
                onClick={this.handleAnimalsAdoptedAndPending}
              >
                Pendientes - Adoptados
              </Button>
            </div>
          </React.Fragment>
        ) : null}

        <Divider orientation="left"> ** Lista de animales </Divider>
        {content}

        {visibleProfile ? (
          <AnimalProfile sendToChild={this.carryToChild} data={profileAnimal} />
        ) : null}

        {modalListAnimals ? (
          <AnimalPendingAdopted
            data={listAnimalsAdoptedAndPending}
            sendToChildList={this.carryToChildList}
          />
        ) : null}
      </div>
    );
  }
}

Animal.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  animals: PropTypes.object.isRequired,
  getAnimals: PropTypes.func.isRequired,
  getListAnimalsAdoptedAndPending: PropTypes.func.isRequired,
  deleteAnimal: PropTypes.func.isRequired,
  adoptAnimal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  animals: state.animals
});

export default connect(
  mapStateToProps,
  { getAnimals, deleteAnimal, adoptAnimal, getListAnimalsAdoptedAndPending }
)(Animal);
