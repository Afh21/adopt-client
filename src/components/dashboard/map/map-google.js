import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

import Map from "./map";
// ======================================= Class ================================

class MapGoogle extends Component {
  state = {
    goCoords: {}
  };

  handleCoordsInMap = () => {
    // console.log("Map: ", this.state.goCoords);
    this.props.communicateToChild(false, this.state.goCoords);
  };

  render() {
    return (
      <Modal
        visible={true}
        width={800}
        okText="Confirmar!"
        cancelButtonProps={{ hidden: true }}
        onOk={this.handleCoordsInMap}
      >
        <Map
          id="myMap"
          options={{
            center: { lat: 5.446256568054836, lng: -74.66503557077789 },
            zoom: 15
          }}
          onMapLoad={map => {
            const marker = new window.google.maps.Marker({
              position: {
                lat: 5.446256568054836,
                lng: -74.66503557077789
              },
              map: map,
              animation: window.google.maps.Animation.DROP,
              draggable: true,
              title: "¿Es tu dirección actual?"
            });
            marker.addListener("dragend", e => {
              const position = {};
              position.lat = e.latLng.lat();
              position.lng = e.latLng.lng();

              const infoWindow = new window.google.maps.InfoWindow({
                content:
                  "Si esta es tu dirección de residencia presiona el botón confirmar! \n " +
                  "",
                position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
              });

              this.setState({ goCoords: position });
              infoWindow.open(map);
            });
          }}
        />
      </Modal>
    );
  }
}

MapGoogle.propTypes = {
  communicateToChild: PropTypes.func.isRequired
};

export default MapGoogle;
