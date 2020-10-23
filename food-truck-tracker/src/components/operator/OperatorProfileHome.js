import React, { Component } from 'react';
// import deleteIcon from '../../Images/delete-icon.png';
// import editIcon from '../../Images/edit-icon.png';

import { Link } from 'react-router-dom';

const mockStateData = {
	operator: {
		name: 'A Sample Operator',
		trucks: [
			{
				imageUrl:
					'https://image.shutterstock.com/image-vector/hot-dog-truck-vector-food-600w-1277718370.jpg',
				cuisine: 'Asian',
				ratings: [7, 8, 9, 5, 10],
				currentLocation: 'Las Vegas, NV',
				departureTime: '3:15pm',
			},
			{
				imageUrl:
					'https://previews.123rf.com/images/carlanichiata/carlanichiata1707/carlanichiata170700006/82550045-food-truck-icon-simple-vector-illustration-.jpg',
				cuisine: 'American',
				ratings: [6, 8, 7, 4, 9, 10, 3, 8, 7],
				currentLocation: 'Denver, CO',
				departureTime: '11:15am',
			},
			{
				imageUrl:
					'https://previews.123rf.com/images/carlanichiata/carlanichiata1707/carlanichiata170700006/82550045-food-truck-icon-simple-vector-illustration-.jpg',
				cuisine: 'French',
				ratings: [4, 7, 5, 9, 10, 6, 10, 8, 7],
				currentLocation: 'Los Angeles, CA',
				departureTime: '12:45pm',
			},
			{
				imageUrl:
					'https://previews.123rf.com/images/carlanichiata/carlanichiata1707/carlanichiata170700006/82550045-food-truck-icon-simple-vector-illustration-.jpg',
				cuisine: 'French',
				ratings: [4, 7, 5, 9, 10, 6, 10, 8, 7],
				currentLocation: 'Los Angeles, CA',
				departureTime: '12:45pm',
			},
			{
				imageUrl:
					'https://previews.123rf.com/images/carlanichiata/carlanichiata1707/carlanichiata170700006/82550045-food-truck-icon-simple-vector-illustration-.jpg',
				cuisine: 'French',
				ratings: [4, 7, 5, 9, 10, 6, 10, 8, 7],
				currentLocation: 'Los Angeles, CA',
				departureTime: '12:45pm',
			},
		],
	},
};

class OperatorProfileHome extends Component {
	constructor() {
		super();
		this.state = {
			operator: {
				name: '',
				trucks: [
					{
						name: '',
						imageUrl: '',
						cuisine: '',
						ratings: [],
						currentLocation: '',
						departureTime: '',
					},
				],
			},
		};
	}

	componentDidMount() {
		this.setState(mockStateData);
	}

	render() {
		return (
			<div className="operator-home">
				<header className="operator-header">
					{/* <img src="" alt=""/> */}
					<h3>Welcome, {this.state.operator.name} 👋 </h3>
					<Link to={`/newtruck`}>
						<button className="btn"> New Truck </button>
					</Link>
				</header>

				<section className="operator-trucks">
					{this.state.operator.trucks.map((truck) => {
						let sumAllRating = 0;

						truck.ratings.forEach((rating) => {
							sumAllRating += rating;
						});

						console.log(sumAllRating);

						const avgRating = sumAllRating / truck.ratings.length;

						return (
							<div className="truck-card">
								<img src={truck.imageUrl}  alt="food-truck" className="truck-img" />
								<h3>Location: {truck.currentLocation}</h3>
								<h3>Cuisine: {truck.cuisine} </h3>
								<h3>Avg. Rating: {avgRating.toFixed(1)} </h3>
								<h3>Departure Time: {truck.departureTime}</h3>
								<div className="icons">
									<Link to="/edittruck">
										{/* <img src={editIcon} alt="edit icon" className="edit-icon" /> */}
									</Link>
									{/* <img
										src={deleteIcon}
										alt="delete icon"
										className="delete-icon"
										// onClick={removeTruck}
									/> */}
								</div>
							</div>
						);
					})}
				</section>
			</div>
		);
	}
}

export default OperatorProfileHome;
