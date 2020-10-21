import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { DinerDashboard } from '../components/diner/DinerDashboard';
import OperatorProfileHome  from '../components/operator/OperatorProfileHome';

const PrivateRoute = ({ roleId, ...rest }) => {
<<<<<<< HEAD
	Component = roleId === 1 ? DinerDashboard : OperatorProfileHome;
=======
	Component = roleId === 1 ? DinerDashboard : /*OperatorProfileHome*/ DinerDashboard;
>>>>>>> 05ed04c3a5f7a4e5cb83b7a7e0bc0ab0c44dae48

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
