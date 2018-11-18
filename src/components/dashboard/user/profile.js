import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Redux functions
import { getProfileAndAdoptions } from "../../../redux/actions/profile";

// Css
import { Card, Avatar, Col, Row, Divider, Spin, Tooltip, Button } from "antd";
const { Meta } = Card;

class Profile extends Component {
  componentDidMount = () => {
    const { user } = this.props.auth;
    this.props.getProfileAndAdoptions(user.id);
  };

  render() {
    const { profile } = this.props;
    let content;

    if (profile.loading) {
      content = <Spin size="default" />;
    } else if (
      Array.isArray(profile.adoptions.data) &&
      profile.adoptions.data.length
    ) {
      content = profile.adoptions.data.map(adopt => {
        return (
          <div key={adopt._id} style={{ float: "left", margin: 15 }}>
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src={
                    adopt.animal.image === null
                      ? "http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png"
                      : adopt.animal.image
                  }
                />
              }
              actions={[
                <Tooltip
                  placement="bottom"
                  title={`${
                    adopt.confirmed.toString() === "true"
                      ? "Confirmado"
                      : "Pendiente"
                  }`}
                >
                  <Button
                    icon={`${
                      adopt.confirmed.toString() === "true"
                        ? "check"
                        : "warning"
                    }`}
                  >
                    {" "}
                    {`${
                      adopt.confirmed.toString() === "true"
                        ? "Confirmado"
                        : "Pendiente"
                    }`}
                  </Button>
                </Tooltip>,
                <Button icon="info-circle">Perfil</Button>
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={adopt.animal.name}
              />
            </Card>
          </div>
        );
      });
    } else {
      content = (
        <div>No haz hecho ningun solicitud de adopción, adopta ahora!</div>
      );
    }

    return (
      <Row>
        <Col span={24}>
          <Divider orientation="left">** Perfil </Divider>
        </Col>
        <Col span={24}>
          <Divider orientation="left">
            ** Solicitudes de adopciones realizadas{" "}
          </Divider>
          {content}
        </Col>
      </Row>
    );
  }
}

Profile.propTypes = {
  getProfileAndAdoptions: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileAndAdoptions }
)(Profile);
