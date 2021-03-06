import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import DinerDashboard from '../components/diner/DinerDashboard';
import OperatorProfileHome from '../components/operator/OperatorProfileHome';

const PrivateRoute = ({ roleId, ...rest }) => {
	const Component = roleId === 1 ? DinerDashboard : OperatorProfileHome;

	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.getItem('token') ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default PrivateRoute;
