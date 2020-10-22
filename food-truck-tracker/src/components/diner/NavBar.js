import React from 'react';
import styled from 'styled-components';

import { LOGO as logo } from '../../Images';
import { Button } from '@material-ui/core';
import { SettingsIcon, ExitToAppIcon } from '@material-ui/icons';

const NavStyle = styled.div`
position: 'fixed',
zIndex: 1000px,
left: 0px,
right: 0px,
padding: 0px,
borderRadius: 0px,
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center'
`;

const NavBar = () => {
	return (
		<NavStyle>
			<img src={logo} alt="logo" style={{ height: 70, marginLeft: 20 }} />
			<Button variant="outlined" color="primary" style={{ marginRight: 20 }}>
				<SettingsIcon fontSize="large" />
			</Button>
			<Button variant="outlined" color="primary" style={{ marginRight: 20 }}>
				<ExitToAppIcon fontSize="large" />
			</Button>
		</NavStyle>
	);
};

export default NavBar;
