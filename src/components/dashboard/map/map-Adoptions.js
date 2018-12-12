import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Map from "./map";
import { getAdoptions } from "../../../redux/actions/adoption";
// ======================================= Class ================================

class MapAdoptions extends Component {
  componentDidMount = () => {
    this.props.getAdoptions();
  };

  render() {
    const { adoptions } = this.props.adoptions;

    // Filtro para no sacar los repetidos
    var hash = {};
    let adopt = adoptions.filter(function(current) {
      var exists = !hash[current.user._id] || false;
      hash[current.user._id] = true;
      return exists;
    });

    // Obtengo información para graficar en el mapa
    let dataS = adopt.map(adoption => {
      let coordsT = Object.assign({}, adoption.user.coords);
      let coordS = Object.values(coordsT).map(coord => Object.values(coord));

      let data = {
        user: adoption.user.name,
        position: {
          lat: Object.assign({}, coordS[0]),
          lng: Object.assign({}, coordS[1])
        },
        animal: adoption.animal.name,
        adopted: adoption.confirmed
      };

      return data;
    });

    return (
      <Map
        id="myMap"
        options={{
          center: { lat: 5.449965, lng: -74.672387 },
          scrollwheel: true,
          zoom: 14,
          mapTypeId: "roadmap"
        }}
        onMapLoad={map => {
          dataS.forEach(coord => {
            var marker = new window.google.maps.Marker({
              position: new window.google.maps.LatLng({
                lat: parseFloat(coord.position.lat[0]),
                lng: parseFloat(coord.position.lng[0])
              }),
              map: map,
              animation: window.google.maps.Animation.DROP
            });

            marker.addListener("click", e => {
              const position = {};
              position.lat = e.latLng.lat();
              position.lng = e.latLng.lng();

              const infoWindow = new window.google.maps.InfoWindow({
                content: "Aquí está " + coord.animal + " feliz! ",
                position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
              });

              infoWindow.open(map);
            });
          });
        }}
      />
    );
  } // FIn del render
} // FIn de la Class

MapAdoptions.propTypes = {
  getAdoptions: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  adoptions: state.adoptions
});

export default connect(
  mapStateToProps,
  { getAdoptions }
)(MapAdoptions);
