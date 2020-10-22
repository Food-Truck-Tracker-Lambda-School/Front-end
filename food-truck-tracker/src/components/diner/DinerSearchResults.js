import React from 'react';
import { List, Button } from '@material-ui/core';
import { Icon } from '@material-ui/icons';

const DinerSearchResults = (props) => {
	const handleSearch = (e) => {
		props.setSearchValue(e.target.value);
	};

	return (
		<>
			<input
				placeholder="Search"
				style={{ width: '100%' }}
				onChange={handleSearch}
				value={props.searchValue}
			/>
			<div style={{ overflow: 'auto', flexGrow: '1', marginTop: 10 }}>
				<List component="nav" style={{ verticalAlign: 'middle' }}>
					{props.trucks
						.filter((filtertruck) => {
							return (
								filtertruck.name.includes(props.searchValue) ||
								filtertruck.cuisine.includes(props.searchValue)
							);
						})
						.map((t, index) => {
							let coords = t.currentLocation.split(', ');
							return (
								<List.Item
									key={index}
									onClick={(e) => {
										if (t.departureTime > Date.now()) {
											props.setInfoWindow({
												visible: true,
												position: { lat: coords[0], lng: coords[1] },
												currentTruck: t,
											});
											props.RecenterMap({
												lat: coords[0],
												lng: coords[1],
											});
										}
									}}
								>
									<List.Content floated="right">
										{t.departureTime > Date.now() ? (
											<Button
												icon
												color="green"
												onClick={(e) => {
													e.stopPropagation();
													props.setDestination({
														location: {
															lat: parseFloat(coords[0]),
															lng: parseFloat(coords[1]),
														},
														truckName: t.truckName,
													});
												}}
												size="small"
											>
												<Icon name="location arrow" />
											</Button>
										) : null}
									</List.Content>
                                    <Image src={t.truck-img} />
                                    <List.Content>
                                        <List.Header>{t.name}</List.Header>
                                    </List.Content>
								</List.Item>
							);
						})}
				</List>
			</div>
		</>
	);
};

export default DinerSearchResults;
