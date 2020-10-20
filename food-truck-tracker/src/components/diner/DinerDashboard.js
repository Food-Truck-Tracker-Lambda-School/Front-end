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
	const [dinerInfo, setDinerInfo] = useState({
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



	useEffect(() => {
		fetchTruckData();
		fetchDinerInfo(localStorage.getItem('roleId'));
	}, [fetchTruckData, fetchDinerInfo]);

	useEffect(() => {
		if (dinerInfo.visible) {
			let temp = props.trucks.filter((truck) => {
				return truck.id === dinerInfo.currentTruck.id;
			});
			setDinerInfo({
				...dinerInfo,
				currentTruck: temp[0],
			});
		}
	}, [props.trucks, dinerInfo]);

	return <div></div>;
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
