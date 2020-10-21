import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
	fetchTruckData as ftd,
	fetchDinerInfo as fdi,
	addFavoriteTruck,
	deleteFavoriteTruck,
	addTruckRating,
	addMenuRating,
} from '../../actions/dinerActions';

export const DinerDashboard = ({ fetchTruckData, fetchDinerInfo, ...props }) => {
	const [infoWindow, setInfoWindow] = useState({
		visible: false,
		currentTruck: {
			truckName: '',
			truckImg: '',
			cuisine: '',
			customerRating: [0, 0, 0, 0],
			avgRating: 0,
			menu: [],
		},
	});

	// const RecenterMap = (location) => {
	// 	setMapCenter(location);
	// }

	useEffect(() => {
		fetchTruckData();
		fetchDinerInfo(localStorage.getItem('roleId'));
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

	return (
		<div></div>
	);
};

const mapStateToProps = (state) => {
	return {
		roleId: state.dinerInfo.roleId,
		userInfo: state.dinerInfo.userInfo,
		trucks: state.dinerInfo.trucks,
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
