import { axiosWithAuth } from '../utils/axiosWithAuth';

export const FETCHING_OWNERS_START = 'FETCHING_OWNERS_START';
export const FETCHING_OWNERS_SUCCESS = 'FETCHING_OWNERS_SUCCESS';
export const FETCHING_OWNERS_FAIL = 'FETCHING_OWNERS_FAIL';
export const SET_OWNER_INFO = 'SET_OWNER_INFO';
export const FETCHING_TRUCKS_START = 'FETCHING_TRUCKS_START';
export const FETCHING_TRUCKS_SUCCESS = 'FETCHING_TRUCKS_SUCCESS';
export const FETCHING_TRUCKS_FAIL = 'FETCHING_TRUCKS_FAIL';
export const ADD_TRUCK = 'ADD_TRUCK';
export const UPDATE_TRUCK = 'UPDATE_TRUCK';
export const REMOVE_TRUCK = 'REMOVE_TRUCK';
export const ADD_MENUITEM = 'ADD_MENUITEM';
export const UPDATE_MENUITEM = 'UPDATE_MENUITEM';
export const REMOVE_MENUITEM = 'REMOVE_MENUITEM';

// This function will fetch truck owner info from DB
export const fetchOwnerData = (id) => (dispatch) => {
	dispatch({ type: FETCHING_OWNERS_START });

	axiosWithAuth()
		.get(`/api/owners/${id}`)
		.then((res) => {
			console.log('pl: actions.js: fetchOwnerData: axios get: results: ', res);
			dispatch({
				type: FETCHING_OWNERS_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(
				'pl: actions.js: fetchOwnerData: axios get failure: res: ',
				err.message
			);
			dispatch({ type: FETCHING_OWNERS_FAIL, payload: err.message });
		});
};

// Adds a new truck to the owner database
export const addTruck = (addTruck) => (dispatch) => {
	axiosWithAuth()
		.post('/api/trucks', addTruck)
		.then((res) => {
			console.log('pl: actions.js: addTruck: axios post: results: ', res);
			dispatch({
				type: ADD_TRUCK,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.error(err);
		});
};

// Will allow owner to update truck info
export const updateTruck = (truckId, selectTruck) => (dispatch) => {
	axiosWithAuth()
		.put(`/api/trucks/${truckId}`, selectTruck)
		.then((res) => {
			console.log('pl: actions.js: updateTruck: axios put: res');
			dispatch({
				type: UPDATE_TRUCK,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.error(
				'pl: actions.js: updateTruck: axios put failure: results',
				err.message
			);
		});
};

// Allows owner to delete truck from db
export const removeTruck = (id, selectTruck) => (dispatch) => {
	axiosWithAuth()
		.delete(`/api/trucks/${id}`, selectTruck)
		.then((res) => {
			console.log(
				'pl: actions.js: removeTruck: axios delete success: results: ',
				res
			);
			dispatch({
				type: REMOVE_TRUCK,
				payload: res.data.id,
			});
		})
		.catch((err) => {
			console.error('Failure to delete truck', err.message);
		});
};

// Allows owner to add new items to menu
export const addMenuItem = (id, menuItem) => (dispatch) => {
	axiosWithAuth()
		.post(`/api/trucks/${id}/menu`, menuItem)
		.then((res) => {
			console.log(
				'pl: actions.js: addMenuItem: axios post success: results: ',
				res
			);
			dispatch({
				type: ADD_MENUITEM,
				payload: { data: res.data, truckId: id },
			});
		})
		.catch((err) => {
			console.error(err);
		});
};

// Allows owner to edit and update menu items
export const updateMenuItem = (id, truckId, menuItemId, selectItem) => (
	dispatch
) => {
	axiosWithAuth()
		.put(`/api/trucks/${truckId}/menu/${menuItemId}`, selectItem)
		.then((res) => {
			console.log(
				'pl: actions.js: updateMenuItem: axios put success: res: ',
				res
			);
			dispatch({
				type: UPDATE_MENUITEM,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.error(err);
		});
};

// Allows owner to delete menu items
export const removeMenuItem = (truckId, menuItemId) => (dispatch) => {
	axiosWithAuth()
		.delete(`/api/trucks/${truckId}/menu/${menuItemId}`)
		.then((res) => {
			console.log('delete successful', res);
			dispatch({
				type: REMOVE_MENUITEM,
				payload: { truckId: truckId, menuItemId: menuItemId },
			});
		})
		.catch((err) => {
			console.error('delete failed', err.message);
		});
};
