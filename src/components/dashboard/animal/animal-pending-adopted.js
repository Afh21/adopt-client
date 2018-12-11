import React, { Component } from "react";
import PropTypes from "prop-types";

import { Modal, Tabs, Icon, List, Tag, Tooltip } from "antd";
import "./animal.css";
const TabPane = Tabs.TabPane;

class AnimalPendingAdopted extends Component {
  state = {
    adopted: [],
    pending: []
  };

  componentDidMount = () => {
    const data = this.props.data;
    const adopt = data.filter(currentValue => {
      return currentValue.status === "adopted";
    });

    const pending = data.filter(currentValue => {
      return currentValue.status === "pending";
    });

    this.setState({ adopted: adopt, pending });
  };

  render() {
    const state = this.state;
    return (
      <Modal
        title="Animales Adoptados & En espera"
        visible={true}
        width={700}
        okButtonProps={{ hidden: true }}
        onCancel={() => this.props.sendToChildList(false)}
      >
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <Icon type="api" />
                Adoptados
              </span>
            }
            key="1"
          >
            <List
              itemLayout="vertical"
              style={{ width: 600 }}
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 5
              }}
              dataSource={state.adopted}
              renderItem={item => (
                <List.Item
                  key={item._id}
                  actions={[]}
                  extra={
                    <img
                      className="img-list"
                      alt="image_animal"
                      src={
                        item.image === null
                          ? "http://sveglioarquitectos.com/imagenes/image_not_found.jpg"
                          : item.image
                      }
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={""}
                    title={item.name}
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
          </TabPane>

          <TabPane
            tab={
              <span>
                <Icon type="info-circle" /> En espera
              </span>
            }
            key="2"
          >
            <List
              itemLayout="vertical"
              style={{ width: 600, marginBottom: 0 }}
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 3
              }}
              dataSource={state.pending}
              renderItem={item => (
                <List.Item
                  key={item._id}
                  actions={[]}
                  extra={
                    <img
                      className="img-list"
                      alt="image_animal"
                      src={
                        item.image === null
                          ? "http://sveglioarquitectos.com/imagenes/image_not_found.jpg"
                          : item.image
                      }
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={""}
                    title={item.name}
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
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

AnimalPendingAdopted.propTypes = {
  data: PropTypes.array.isRequired,
  sendToChildList: PropTypes.func.isRequired
};

export default AnimalPendingAdopted;
