import {
	FETCHING_DINER_INFO_START,
	FETCHING_DINER_INFO_SUCCESS,
	FETCHING_DINER_INFO_FAIL,
	SET_FAVORITE_TRUCK_SUCCESS,
	SET_FAVORITE_TRUCK_FAIL,
	FETCHING_TRUCKS_START,
	FETCHING_TRUCKS_SUCCESS,
	FETCHING_TRUCKS_FAIL,
	ADD_TRUCK_RATING_SUCCESS,
	ADD_TRUCK_RATING_FAIL,
	ADD_MENU_RATING_SUCCESS,
	ADD_MENU_RATING_FAIL,
} from '../actions/ownerActions';

const initialState = {
	isFetching: false,
	error: '',
	dinerInfo: {
		dinerId: localStorage.getItem('dinerId'),
		username: '',
		email: '',
		favoriteTrucks: [],
	},
	trucks: [],
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

		case FETCHING_DINER_INFO_START:
			return {
				...state,
				isFetching: true,
			};

		case FETCHING_DINER_INFO_SUCCESS:
			return {
				...state,
				isFetching: false,
				dinerInfo: action.payload,
				error: '',
			};

		case FETCHING_DINER_INFO_FAIL:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};

		case SET_FAVORITE_TRUCK_SUCCESS:
			return {
				...state,
				dinerInfo: {
					...state.dinerInfo,
					favoriteTrucks: [...action.payload],
				},
			};

		case SET_FAVORITE_TRUCK_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case ADD_TRUCK_RATING_SUCCESS:
			return {
				...state,
				trucks: state.trucks.map((truck) => {
					let temp = truck;
					if (action.payload.truckId === truck.id) {
						let AvgRating = 0;
						temp.customerRatings = action.payload.data.map((rating) => {
							AvgRating += rating.customerRating;
							return rating.customerRating;
						});
						temp.customerRatingsAvg = Math.round(
							AvgRating / temp.customerRatings.length
						);
					}
					return temp;
				}),
			};

		case ADD_TRUCK_RATING_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case ADD_MENU_RATING_SUCCESS:
			return {
				...state,
				trucks: state.trucks.map((truck) => {
					let temp = truck;
					if (action.payload.truckId === truck.id) {
						temp.menu = truck.menu.map((menu) => {
							let tempMenu = menu;
							if (action.payload.menuItemId === menu.id) {
								let AvgRating = 0;
								tempMenu.customerRatings = action.payload.data.map((rating) => {
									AvgRating += rating.customerRating;
									return rating.customerRating;
								});
								tempMenu.customerRatingsAvg = Math.round(
									AvgRating / tempMenu.customerRatings.length
								);
							}
							return tempMenu;
						});
					}
					return temp;
				}),
			};

		case ADD_MENU_RATING_FAIL:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};
