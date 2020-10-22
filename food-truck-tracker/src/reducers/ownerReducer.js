import {
	FETCHING_OPERATOR_START,
	FETCHING_OPERATOR_SUCCESS,
	FETCHING_OPERATOR_FAIL,
	ADD_TRUCK,
	UPDATE_TRUCK,
	REMOVE_TRUCK,
	ADD_MENUITEM,
	REMOVE_MENUITEM,
} from '../actions/ownerActions';

const initialState = {
	isFetching: false,
	error: '',
	operator: {
		username: '',
		id: 0,
		email: '',
		trucks: [
			{
				truckId: localStorage.getItem('roleId'),
				imageUrl: '',
				cuisine: '',
				ratings: [],
				currentLocation: '',
				departureTime: '',
			},
		],
	},
};

export const ownerReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_OPERATOR_START: // Initializes fetching state. Will we have a loading icon?
			return {
				...state,
				isFetching: true,
			};

		case FETCHING_OPERATOR_SUCCESS: // returns owner info on successful axios call
			return {
				...state,
				isFetching: false,
				operator: action.payload,
				error: '',
			};

		case FETCHING_OPERATOR_FAIL: // returns error status on failure
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};

		case ADD_TRUCK: // appends a new truck to OPERATOR trucks array
			return {
				...state,
				operator: state.operator,
				trucks: [...state.operator.trucks, action.payload],
			};

		case UPDATE_TRUCK: // allows owner to edit properties of existing truck
			return {
				...state,
				operator: {
					...state.operator,
					trucks: state.operator.trucks.map((truck) => {
						return truck.id === action.payload.id ? action.payload : truck;
					}),
				},
			};

		case REMOVE_TRUCK: // allows owner to delete an existing truck
			return {
				...state,
				operator: {
					...state.operator,
					trucks: state.operator.trucks.filter((truck) => {
						return truck.id !== action.payload;
					}),
				},
			};

		case ADD_MENUITEM: // owner can add a new item to their menu
			return {
				...state,
				operator: {
					...state.operator.trucks.map((truck) => {
						let temp = truck;
						if (truck.id === action.payload.truckId) {
							temp.menu = [...temp.menu, action.payload.data];
						}
						return temp;
					}),
				},
			};

		case REMOVE_MENUITEM: // owner can remove an item from their menu
			return {
				...state,
				operator: {
					...state.operator,
					trucks: state.operator.trucks.map((truck) => {
						let temp = truck;
						if (truck.id === action.payload.truckId) {
							temp.menu = truck.menu.filter((menu) => {
								return menu.id !== action.payload.menuItemId;
							});
						}
						return temp;
					}),
				},
			};
		default:
			return state;
	}
};
