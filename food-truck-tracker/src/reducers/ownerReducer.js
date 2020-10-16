import {
	FETCHING_OWNERS_START,
	FETCHING_OWNERS_SUCCESS,
	FETCHING_OWNERS_FAIL,
	ADD_TRUCK,
	UPDATE_TRUCK,
	REMOVE_TRUCK,
	ADD_MENUITEM,
	REMOVE_MENUITEM,
} from '../actions/ownerActions';

const initialState = {
	isFetching: false,
	error: '',
	ownerInfo: { // ownerInfo might be different based on user designation as diner or owner...
		ownerId: localStorage.getItem('ownerId'), // may not need a separate designation at all, maybe just userId
		username: '',
		email: '',
		trucksOwned: [{ customerRatings: [2, 3, 4] }],
	},
};

export const ownerReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_OWNERS_START: // Initializes fetching state. Will we have a loading icon?
			return {
				...state,
				isFetching: true,
			};

		case FETCHING_OWNERS_SUCCESS: // returns owner info on successful axios call
			return {
				...state,
				isFetching: false,
				ownerInfo: action.payload,
				error: '',
			};

		case FETCHING_OWNERS_FAIL: // returns error status on failure 
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};

		case ADD_TRUCK: // appends a new truck to owners trucks array
			return {
				...state,
				ownerInfo: state.ownerId,
				trucksOwned: [...state.ownerInfo.trucksOwned, action.payload],
			};

		case UPDATE_TRUCK: // allows owner to edit properties of existing truck
			return {
				...state,
				ownerInfo: {
					...state.ownerInfo,
					trucksOwned: state.ownerInfo.trucksOwned.map((truck) => {
						return truck.id === action.payload.id ? action.payload : truck;
					}),
				},
			};

		case REMOVE_TRUCK: // allows owner to delete an existing truck
			return {
				...state,
				ownerInfo: {
					...state.ownerInfo,
					trucksOwned: state.ownerInfo.trucksOwned.filter((truck) => {
						return truck.id !== action.payload;
					}),
				},
			};

		case ADD_MENUITEM: // owner can add a new item to their menu
			return {
				...state,
				ownerInfo: {
					...state.ownerInfo.trucksOwned.map((truck) => {
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
				ownerInfo: {
					...state.ownerInfo,
					trucksOwned: state.ownerInfo.trucksOwned.map((truck) => {
						let temp = truck;
						if (truck.id === action.payload.truckId) {
							temp.menu = truck.menu.filter((menu) => {
								return menu.id !== action.payload.menuItemId;
							});
							return temp;
						}
					}),
				},
			};
		default:
			return state;
	}
};
