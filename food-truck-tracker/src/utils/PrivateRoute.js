import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { DinerDashboard } from '../components/diner/DinerDashboard';
// import { OperatorProfileHome } from '../components/owner/OperatorProfileHome';

const PrivateRoute = ({ roleId, ...rest }) => {
	Component = roleId === 1 ? DinerDashboard : /*OperatorProfileHome*/ DinerDashboard;

	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);

};

export default PrivateRoute;
