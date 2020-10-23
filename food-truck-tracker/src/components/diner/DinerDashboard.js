import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import MapContainer from "./MapContainer";
import SideBar from "./SideBar";
import ClearRoute from "./ClearRoute";

import {
  fetchTruckData as ftd,
  fetchDinerInfo as fdi,
  addFavoriteTruck,
  deleteFavoriteTruck,
  addTruckRating,
  addMenuRating,
} from "../../actions/dinerActions";

export const DinerDashboard = ({
  fetchTruckData,
  fetchDinerInfo,
  ...props
}) => {
  const [infoWindow, setInfoWindow] = useState({
    visible: false,
    position: {},
    currentTruck: {
      truckName: "",
      truckImg: "",
      cuisine: "",
      customerRating: [0, 0, 0, 0],
      avgRating: 0,
      menu: [],
      currentLocation: "",
    },
  });

  const [destination, setDestination] = useState(null);
  const [milesRadius, setMilesRadius] = useState(1);
  const [mapCenter, setMapCenter] = useState({});
  const [myLocation, setMyLocation] = useState("");

  useEffect(() => {
    fetchTruckData();
    fetchDinerInfo(localStorage.getItem("roleId"));
  }, [fetchTruckData, fetchDinerInfo]);

  useEffect(() => {
    if (infoWindow.visible) {
      let temp = props.trucks.filter((truck) => {
        return truck.id === infoWindow.currentTruck.id;
      });
      setInfoWindow({
        ...infoWindow,
        currentTruck: temp[0],
      });
    }
  }, [props.trucks, infoWindow]);

  const RecenterMap = (location) => {
    setMapCenter(location);
  };

  return (
    <>
      <ClearRoute
        destination={destination}
        setDestination={setDestination}
        RecenterMap={RecenterMap}
        myLocation={myLocation}
      />
      <SideBar
        infoWindow={infoWindow}
        setInfoWindow={setInfoWindow}
        destination={destination}
        setDestination={setDestination}
        trucks={props.trucks}
        milesRadius={milesRadius}
        setMilesRadius={setMilesRadius}
        RecenterMap={RecenterMap}
        myLocation={myLocation}
        addFavoriteTruck={props.addFavoriteTruck}
        deleteFavoriteTruck={props.deleteFavoriteTruck}
        addTruckRating={props.addTruckRating}
        addMenuRating={props.addMenuRating}
      />
      <MapContainer
        infoWindow={infoWindow}
        setInfoWindow={setInfoWindow}
        destination={destination}
        trucks={props.trucks}
        milesRadius={milesRadius}
        mapCenter={mapCenter}
        setMapCenter={setMapCenter}
        myLocation={myLocation}
        setMyLocation={setMyLocation}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    infoWindow: state.infoWindow,
    trucks: state.trucks,
  };
};

export default connect(mapStateToProps, {
  fetchTruckData: ftd,
  fetchDinerInfo: fdi,
  addFavoriteTruck,
  deleteFavoriteTruck,
  addTruckRating,
  addMenuRating,
})(DinerDashboard);
