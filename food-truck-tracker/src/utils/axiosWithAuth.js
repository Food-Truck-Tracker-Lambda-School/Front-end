import axios from 'axios';

export const axiosWithAuth = () => {
	const token = localStorage.getItem('token');

	return axios.create({
		baseURL: 'https://foodtrucktrackers.herokuapp.com',
		headers: {
			authorization: `${token}`,
		},
	}); 
};

export default axiosWithAuth;