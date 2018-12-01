import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDataForDashboard } from "../../../redux/actions/dashboard";

import { Col, Row, Card, Tooltip, Icon } from "antd";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getDataForDashboard();
  };

  render() {
    const { dashboard } = this.props.dashboard;
    return (
      <Row>
        <Col span={8}>
          <Card
            title="Usuarios"
            style={{ width: 250, fontSize: 20, borderBottom: "5px solid" }}
          >
            <Row>
              <Col span={12}>
                {" "}
                <Icon type="team" style={{ fontSize: "1.5em" }} />
              </Col>
              <Col span={12}>
                <p style={{ marginLeft: 25, fontSize: 20, fontWeight: "bold" }}>
                  {dashboard.users}
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Animales"
            style={{ width: 250, fontSize: 20, borderBottom: "5px solid" }}
          >
            <Row>
              <Col span={12}>
                {" "}
                <Icon type="home" style={{ fontSize: "1.5em" }} />
              </Col>
              <Col span={12}>
                <p style={{ marginLeft: 25, fontSize: 20, fontWeight: "bold" }}>
                  {dashboard.animals}
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Adopciones"
            style={{ width: 250, fontSize: 20, borderBottom: "5px solid" }}
          >
            <Row>
              <Col span={12}>
                {" "}
                <Icon type="share-alt" style={{ fontSize: "1.5em" }} />
              </Col>
              <Col span={12}>
                <p>
                  {dashboard.adoptions > 0 ? (
                    dashboard.adoptions
                  ) : (
                    <Tooltip placement="bottom" title="No hay ninguna adopción">
                      <span
                        style={{
                          marginLeft: 25,
                          fontSize: 20,
                          fontWeight: "bold"
                        }}
                      >
                        0
                      </span>
                    </Tooltip>
                  )}{" "}
                </p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
  getDataForDashboard: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  dashboard: state.dashboard,
  getDataForDashboard: PropTypes.func.isRequired
});

export default connect(
  mapStateToProps,
  { getDataForDashboard }
)(Dashboard);
