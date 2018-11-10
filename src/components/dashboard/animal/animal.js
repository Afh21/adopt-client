import React, { Component } from "react";
import PropTypes from "prop-types";

// Css
import { List, Avatar, Button, Spin, Tag, Icon, Divider, Tooltip } from "antd";

// Redux
import { connect } from "react-redux";
import { getAnimals } from "../../../redux/actions/animals";

import "./animal.css";
import AnimalProfile from "./animal-profile";

class Animal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleProfile: false,
      profileAnimal: {}
    };

    // Bind function to handleProfile
    this.handleProfile = this.handleProfile.bind(this);
  }

  // Looking for a profile
  handleProfile = e => {
    this.setState({
      visibleProfile: !this.state.visibleProfile,
      profileAnimal: e
    });
  };

  carryToChild = (bool, profile) => {
    this.setState({
      visibleProfile: bool,
      profileAnimal: profile
    });
  };

  componentDidMount = () => {
    // Redux function
    this.props.getAnimals();
  };

  render() {
    const { visibleProfile, profileAnimal } = this.state;

    const { animals, loading } = this.props.animals;
    const data = [];
    let content;

    if (loading) {
      content = <Spin size="large" />;
    } else if (animals.length > 0) {
      animals.map(animal => {
        data.push({
          id: animal._id,
          name: animal.name,
          animal: animal.animal,
          genre: animal.genre,
          state: animal.state,
          breed: animal.breed
        });

        return (content = (
          <List
            itemLayout="vertical"
            size="large"
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
                  <Button type="primary" ghost>
                    {" "}
                    Adoptame!{" "}
                  </Button>
                ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src={
                      "http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png"
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
                    )}{" "}
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
    }

    return (
      <div className="animalList">
        <div style={{ marginBottom: "50px" }}>
          <Button
            icon="form"
            onClick={() =>
              this.props.history.push("/dashboard/animal/register")
            }
          >
            Crear Animal
          </Button>
        </div>
        <Divider orientation="left">
          {" "}
          ** Lista de animales disponibles para adoptar{" "}
        </Divider>
        {content}

        {visibleProfile ? (
          <AnimalProfile sendToChild={this.carryToChild} data={profileAnimal} />
        ) : null}
      </div>
    );
  }
}

Animal.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  animals: PropTypes.object.isRequired,
  getAnimals: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  animals: state.animals
});

export default connect(
  mapStateToProps,
  { getAnimals }
)(Animal);
