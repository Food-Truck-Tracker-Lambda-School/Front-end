import {
	FETCHING_ownerS_START,
	FETCHING_ownerS_SUCCESS,
	FETCHING_ownerS_ERROR,
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
	}
};
