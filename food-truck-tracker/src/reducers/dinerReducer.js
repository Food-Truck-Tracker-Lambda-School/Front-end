import {
	FETCHING_DINER_INFO_START,
	FETCHING_DINER_INFO_SUCCESS,
	FETCHING_DINER_INFO_ERROR,
	SET_FAVORITE_TRUCK_SUCCESS,
	SET_FAVORITE_TRUCK_ERROR,
	FETCHING_TRUCKS_START,
	FETCHING_TRUCKS_SUCCESS,
	FETCHING_TRUCKS_FAIL,
	ADD_TRUCK_RATING_SUCCESS,
	ADD_TRUCK_RATING_ERROR,
	ADD_MENU_RATING_SUCCESS,
	ADD_MENU_RATING_ERROR,
} from '../actions/ownerActions';

const initialState = {
	isFetching: false,
	error: '',
	trucks: [],
	user: {
		roleId: '',
		name: '',
		email: '',
		phoneNumber: '',
		currentLocation: '',
		username: '',
		password: '',
		passwordConfirm: '',
		terms: false,
		favoriteTrucks: [],
	},
};

export const dinerReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_TRUCKS_START:
			return {
				...state,
				isFetching: true,
			};

		case FETCHING_TRUCKS_SUCCESS:
			return {
				...state,
				trucks: action.payload,
				error: '',
			};

		case FETCHING_TRUCKS_FAIL:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};
	}
};
