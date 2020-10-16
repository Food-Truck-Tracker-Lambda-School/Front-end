import axiosWithAuth from '../utils/axiosWithAuth';
import {
	FETCHING_TRUCKS_FAIL,
	FETCHING_TRUCKS_START,
	FETCHING_TRUCKS_SUCCESS,
} from './ownerActions';

export const FETCHING_DINER_INFO_START = 'FETCHING_DINER_INFO_START';
export const FETCHING_DINER_INFO_SUCCESS = 'FETCHING_DINER_INFO_SUCCESS';
export const FETCHING_DINER_INFO_FAIL = 'FETCHING_DINER_INFO_FAIL';
export const SET_FAVORITE_TRUCK_SUCCESS = 'SET_FAVORITE_TRUCK_SUCCESS';
export const SET_FAVORITE_TRUCK_FAIL = 'SET_FAVORITE_TRUCK_FAIL';
export const ADD_TRUCK_RATING_SUCCESS = 'ADD_TRUCK_RATING_SUCCESS';
export const ADD_TRUCK_RATING_FAIL = 'ADD_TRUCK_RATING_FAIL';
export const ADD_MENU_RATING_SUCCESS = 'ADD_MENU_RATING_SUCCESS';
export const ADD_MENU_RATING_FAIL = 'ADD_MENU_RATING_FAIL';

// Fetches info on diners/foodies from db
export const fetchDinerInfo = (userId) => (dispatch) => {
	dispatch({ type: FETCHING_DINER_INFO_START });

	axiosWithAuth()
		.get(`/api/diners/${userId}`)
		.then((res) => {
			console.log('pl: dinerActions.js: fetchDinerInfo: axios get: res: ', res);
			dispatch({
				type: FETCHING_DINER_INFO_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.FAIL(err.message);
			dispatch({
				type: FETCHING_DINER_INFO_FAIL,
				payload: err.data,
			});
		});
};

// Fetches info on trucks that users track
export const fetchTruckData = () => (dispatch) => {
	dispatch({ type: FETCHING_TRUCKS_START });

	axiosWithAuth()
		.get(`/api/trucks`)
		.then((res) => {
			console.log(
				'pl: dinerActions.js: fetchTruckData: axios get trucks: res: ',
				res
			);
			dispatch({
				type: FETCHING_TRUCKS_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log(err);
			dispatch({
				type: FETCHING_TRUCKS_FAIL,
				payload: err.message,
			});
		});
};

// Allows user to add a favorite truck to their favs list
export const addFavoriteTruck = (userId, truckId) => (dispatch) => {
	axiosWithAuth()
		.post(`/api/diners/${userId}/favoriteTrucks`, {
			truckId: truckId,
		})
		.then((res) => {
			console.log(
				'pl: dinerActions.js: addFavoriteTruck: axios post: res: ',
				res
			);
			dispatch({
				type: SET_FAVORITE_TRUCK_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log('Unable to add to favorites', err);
			dispatch({
				type: SET_FAVORITE_TRUCK_FAIL,
				payload: err.message,
			});
		});
};

// Allows user to delete favorite truck from faves list
export const deleteFavoriteTruck = (userId, truckId) => (dispatch) => {
	console.log(truckId);
	axiosWithAuth()
		.delete(`/api/diners/${userId}/favoriteTrucks`, {
			truckId: truckId,
		})
		.then((res) => {
			console.log(
				'pl: dinerActions.js: deleteFavoriteTruck: axios delete: res: ',
				res
			);
			dispatch({
				type: SET_FAVORITE_TRUCK_SUCCESS,
				payload: res.data,
			});
		})
		.catch((err) => {
			console.log('error', err);
			dispatch({
				type: SET_FAVORITE_TRUCK_FAIL,
				payload: err.message,
			});
		});
};

// Allows user to add a rating to the selected truck
export const addTruckRating = (truckId, dinerId, customerRating) => (
	dispatch
) => {
	axiosWithAuth()
		.post(`/api/trucks/${truckId}/customerRatings/${dinerId}`, {
			customerRating: customerRating,
		})
		.then((res) => {
			console.log(res);
			dispatch({
				type: ADD_TRUCK_RATING_SUCCESS,
				payload: { data: res.data, truckId: truckId },
			});
		})
		.catch((err) => {
			dispatch({
				type: ADD_TRUCK_RATING_FAIL,
				payload: err.message,
			});
		});
};

// Allows user to rate items on the truck's menu
export const addMenuRating = (truckId, menuItemId, dinerId, customerRating) => (
	dispatch
) => {
	axiosWithAuth()
		.post(
			`/api/trucks/${truckId}/menu/${menuItemId}/customerRatings/${dinerId}`,
			{
				customerRating: customerRating,
			}
		)
		.then((res) => {
			console.log(res);
			dispatch({
				type: ADD_MENU_RATING_SUCCESS,
				payload: { data: res.data, truckId: truckId, menuItemId: menuItemId },
			});
		})
		.catch((err) => {
			dispatch({
				type: ADD_MENU_RATING_FAIL,
				payload: err.message,
			});
		});
};
