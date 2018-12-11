import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

// Redux
import { connect } from "react-redux";

// Css
import { Modal, Row, Col, Tag, Icon, Tooltip } from "antd";
import "./animal.css";

class AnimalProfile extends Component {
  handleCancel = () => {
    // Update to parent
    const { sendToChild } = this.props;
    sendToChild(false, {});
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <Modal
          visible={true}
          okButtonProps={{ hidden: true }}
          onCancel={this.handleCancel}
          width={600}
          maskClosable={false}
        >
          <Row>
            <Col span={12}>
              <div>
                {data.image === null ? (
                  <img
                    alt="image_animal"
                    src={
                      "http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png"
                    }
                    style={{ borderRadius: 8, height: 190, width: 280 }}
                  />
                ) : null}
              </div>
            </Col>
            <Col span={12}>
              <ul className="profile">
                <li>
                  Nombre: <Tag> {data.name} </Tag>
                </li>
                <li>
                  Tipo: <Tag> {data.animal === "dog" ? "Perro" : "Gato"} </Tag>
                </li>
                <li>
                  Género:{" "}
                  <Tag>
                    {" "}
                    {data.genre === "male" ? (
                      <Tooltip placement="topLeft" title="Macho">
                        <Icon type="man" />
                      </Tooltip>
                    ) : (
                      <Tooltip placement="topLeft" title="Hembra">
                        <Icon type="woman" />
                      </Tooltip>
                    )}{" "}
                  </Tag>
                </li>
                <li>
                  Raza:{" "}
                  <Tag style={{ textTransform: "capitalize" }}>
                    {" "}
                    {data.breed.name}{" "}
                  </Tag>
                </li>
                <li>
                  Tipo de sangre:{" "}
                  <Tag>
                    {" "}
                    <Icon type="heart" /> {data.rh.name}{" "}
                  </Tag>
                </li>
                <li>
                  Altura:{" "}
                  <Tag>
                    {" "}
                    {data.height} {data.typeHeight}
                  </Tag>
                </li>
                <li>
                  Peso:{" "}
                  <Tag>
                    {" "}
                    {data.weight} {data.typeWeight}
                  </Tag>
                </li>
                <li>
                  Nació:{" "}
                  <Tag>
                    <Tooltip placement="topLeft" title="Año / Mes / Dia">
                      {" "}
                      <Moment
                        date={data.born}
                        format="YYYY/MM/DD"
                        add={{ hours: 12 }}
                      />{" "}
                    </Tooltip>
                  </Tag>
                </li>
                <li>
                  Edad:{" "}
                  <Tag>
                    {data.age > 1 ? `${data.age} años` : `${data.age} meses`}
                  </Tag>
                </li>
                <li>
                  Estado:{" "}
                  {data.state === "healthy" ? (
                    <Tag color="green">Saludable</Tag>
                  ) : (
                    <Tag color="red">Enfermo</Tag>
                  )}
                </li>
              </ul>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

AnimalProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  sendToChild: PropTypes.func.isRequired,
  data: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps)(AnimalProfile);
