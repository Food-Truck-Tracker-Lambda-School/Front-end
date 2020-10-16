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
	ownerInfo: {
		ownerId: localStorage.getItem('ownerId'),
		username: '',
		email: '',
		trucksOwned: [{ customerRatings: [2, 3, 4] }],
	},
};

export const ownerReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_OWNERS_START:
			return {
				...state,
				isFetching: true,
			};
		case FETCHING_OWNERS_SUCCESS:
			return {
				...state,
				isFetching: false,
				ownerInfo: action.payload,
				error: '',
			};
		case FETCHING_OWNERS_FAIL:
			return {
				...state,
				isFetching: false,
				error: action.payload,
			};

		case ADD_TRUCK:
			return {
				...state,
				ownerInfo: state.ownerId,
				trucksOwned: [...state.ownerInfo.trucksOwned, action.payload],
			};

		case UPDATE_TRUCK:
			return {
				...state,
				ownerInfo: {
					...state.ownerInfo,
					trucksOwned: state.ownerInfo.trucksOwned.map((truck) => {
						return truck.id === action.payload.id ? action.payload : truck;
					}),
				},
			};

		case REMOVE_TRUCK:
			return {
				...state,
				ownerInfo: {
					...state.ownerInfo,
					trucksOwned: state.ownerInfo.trucksOwned.filter((truck) => {
						return truck.id !== action.payload;
					}),
				},
			};

		case ADD_MENUITEM:
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

		case REMOVE_MENUITEM:
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
