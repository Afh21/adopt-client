import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Chart from "react-apexcharts";
import { getDataForDashboard } from "../../../redux/actions/dashboard";

import { Row, Col, Spin } from "antd";
import moment from "moment";

class Dashboard extends Component {
  componentDidMount = () => {
    this.props.getDataForDashboard();
  };

  render() {
    const { dashboard } = this.props;

    const optionsForUsers = {
      labels: ["Total Usuarios", "Administradores", "Invitados"]
    };

    const optionsForAnimals = {
      labels: [
        "Total Animales",
        "Disponibles para adoptar",
        "Pendientes para adopcion",
        "Adoptados"
      ]
    };

    const optionsForAdoptions = {
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              show: true
            },
            value: {
              show: true,
              fontSize: "14px",
              formatter: function(val) {
                return val + "";
              }
            },
            total: {
              show: false,
              label: "Total"
            }
          }
        }
      },
      labels: ["Total Adopciones", "Aprobadas", "No Aprobadas"]
    };

    const seriesForUsers = [];
    const seriesForAnimals = [];
    const seriesForAdoptions = [];

    let renderUsers;
    let renderAnimals;
    let renderAdoptions;
    let renderGraphicLineal;

    if (dashboard.loading) {
      renderUsers = <Spin size="large" />;
      renderAnimals = <Spin size="large" />;
      renderAdoptions = <Spin size="large" />;
    } else if (Object.keys(dashboard.dashboard).length > 0) {
      // Verifica si hay adpciones hechas
      if (dashboard.dashboard.dataForAdoptions.adoptions) {
        const { adoptions } = dashboard.dashboard.dataForAdoptions;
        const dataMonths = [];
        const dataDogs = [];
        const dataCats = [];

        adoptions.map(adoption => {
          return dataMonths.push({
            month: moment(adoption.createdAt).format("MM"),
            animals: adoption.animal.animal
          });
        });

        const eneroCat = dataMonths.filter(current => {
          return current.animals === "cat" && current.month === "01";
        });
        const eneroDog = dataMonths.filter(current => {
          return current.animals !== "cat" && current.month === "01";
        });
        const febreroCat = dataMonths.filter(current => {
          return current.animals === "cat" && current.month === "02";
        });
        const febreroDog = dataMonths.filter(current => {
          return current.animals !== "cat" && current.month === "02";
        });
        const marzoCat = dataMonths.filter(current => {
          return current.animals === "cat" && current.month === "03";
        });
        const marzoDog = dataMonths.filter(current => {
          return current.animals !== "cat" && current.month === "03";
        });
        const abrilCat = dataMonths.filter(current => {
          return current.animals === "cat" && current.month === "04";
        });
        const abrilDog = dataMonths.filter(current => {
          return current.animals !== "cat" && current.month === "04";
        });
        const mayoCat = dataMonths.filter(current => {
          return current.animals === "cat" && current.month === "05";
        });
        const mayoDog = dataMonths.filter(current => {
          return current.animals !== "cat" && current.month === "05";
        });
        const junioCat = dataMonths.filter(current => {
          return current.animals === "cat" && current.month === "06";
        });
        const junioDog = dataMonths.filter(current => {
          return current.animals !== "cat" && current.month === "06";
        });
        const julioCat = dataMonths.filter(current => {
          return current.animals === "cat" && current.month === "07";
        });
        const julioDog = dataMonths.filter(current => {
          return current.animals !== "cat" && current.month === "07";
        });
        const agostoCat = dataMonths.filter(current => {
          return current.animals === "cat" && current.month === "08";
        });
        const agostoDog = dataMonths.filter(current => {
          return current.animals !== "cat" && current.month === "08";
        });
        const septiembreCat = dataMonths.filter(current => {
          return current.animals === "cat" && current.month === "09";
        });
        const septiembreDog = dataMonths.filter(current => {
          return current.animals !== "cat" && current.month === "09";
        });
        const octubreCat = dataMonths.filter(current => {
          return current.animals === "cat" && current.month === "10";
        });
        const octubreDog = dataMonths.filter(current => {
          return current.animals !== "cat" && current.month === "10";
        });
        const noviembreCat = dataMonths.filter(current => {
          return current.animals === "cat" && current.month === "11";
        });
        const noviembreDog = dataMonths.filter(current => {
          return current.animals !== "cat" && current.month === "11";
        });
        const diciembreCat = dataMonths.filter(current => {
          return current.animals === "cat" && current.month === "12";
        });
        const diciembreDog = dataMonths.filter(current => {
          return current.animals !== "cat" && current.month === "12";
        });

        dataDogs.push(
          eneroDog.length,
          febreroDog.length,
          marzoDog.length,
          abrilDog.length,
          mayoDog.length,
          junioDog.length,
          julioDog.length,
          agostoDog.length,
          septiembreDog.length,
          octubreDog.length,
          noviembreDog.length,
          diciembreDog.length
        );
        dataCats.push(
          eneroCat.length,
          febreroCat.length,
          marzoCat.length,
          abrilCat.length,
          mayoCat.length,
          junioCat.length,
          julioCat.length,
          agostoCat.length,
          septiembreCat.length,
          octubreCat.length,
          noviembreCat.length,
          diciembreCat.length
        );

        var optionsGraphics = {
          chart: {
            height: 450,
            width: "100%",
            type: "line",
            background: "#f4f4f4",
            forecolor: "#333",
            stacked: false
          },
          colors: ["#FF1654", "#247BA0"],
          stroke: {
            width: [4, 4]
          },
          xaxis: {
            categories: [
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Agosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre"
            ]
          },
          yaxis: [
            {
              min: 0,
              max: 500,
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true,
                color: "#FF1654"
              },
              labels: {
                style: {
                  color: "#FF1654"
                }
              },
              title: {
                text: "Perros"
              }
            },
            {
              min: 0,
              max: 500,
              opposite: true,
              axisTicks: {
                show: true
              },
              axisBorder: {
                show: true,
                color: "#247BA0"
              },
              labels: {
                style: {
                  color: "#247BA0"
                }
              },
              title: {
                text: "Gatos"
              }
            }
          ],
          tooltip: {
            shared: false,
            intersect: true,
            x: {
              show: false
            }
          },
          legend: {
            horizontalAlign: "left",
            offsetX: 40
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "20%"
            }
          },
          fill: {
            colors: ["#f44336"]
          },
          dataLabels: {
            enabled: false
          },
          title: {
            text: "ADOPCIONES x MES",
            align: "center",
            margin: 20,
            offsetY: 20,
            style: {
              fontSize: "25px"
            }
          },
          markers: {
            size: 0
          }
        };

        var seriesGraphics = [
          {
            name: "Perros",
            data: dataDogs
          },
          {
            name: "Gatos",
            data: dataCats
          }
        ];

        renderGraphicLineal = (
          <Chart
            options={optionsGraphics}
            series={seriesGraphics}
            type="bar"
            height="400"
            width="100%"
          />
        );
      }

      const dataToUsers = dashboard.dashboard.dataForUsers;
      seriesForUsers.push(
        dataToUsers.total,
        dataToUsers.administrators,
        dataToUsers.guests
      );

      const dataToAnimals = dashboard.dashboard.dataForAnimals;
      seriesForAnimals.push(
        dataToAnimals.total,
        dataToAnimals.enabled,
        dataToAnimals.pending,
        dataToAnimals.adopted
      );

      const dataToAdoptions = dashboard.dashboard.dataForAdoptions;
      seriesForAdoptions.push(
        dataToAdoptions.total,
        dataToAdoptions.true,
        dataToAdoptions.false
      );

      renderAnimals = (
        <Chart
          options={optionsForAnimals}
          series={seriesForAnimals}
          type="pie"
          width="400"
        />
      );

      renderUsers = (
        <Chart
          options={optionsForUsers}
          series={seriesForUsers}
          type="pie"
          width="350"
        />
      );

      renderAdoptions = (
        <Chart
          options={optionsForAdoptions}
          series={seriesForAdoptions}
          type="radialBar"
          width="250"
        />
      );
    }

    return (
      <Row>
        <Col span={8}>{renderUsers}</Col>
        <Col span={8}>{renderAnimals}</Col>
        <Col span={8}>{renderAdoptions}</Col>
        <Col span={24}>{renderGraphicLineal}</Col>
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
