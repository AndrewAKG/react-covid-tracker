import styled from 'styled-components';
import { Tooltip, Typography } from '@mui/material';
import React from 'react';

interface MarkerProps {
	name: string;
	temp: number;
	lat: number;
	lng: number;
}

const Wrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 18px;
	height: 18px;
	background-color: #000;
	border: 2px solid #fff;
	border-radius: 100%;
	user-select: none;
	transform: translate(-50%, -50%);
	&:hover {
		z-index: 10;
		background-color: #ddd;
	}
`;

export const Marker = ({ name, temp }: MarkerProps) => (
	<Tooltip
		title={
			<React.Fragment>
				<Typography color="inherit">
					<strong>Name:</strong> {name}
				</Typography>
				<Typography color="inherit">
					<strong>Temp:</strong> {temp} C{'\u00b0'}
				</Typography>
			</React.Fragment>
		}
		arrow
	>
		<Wrapper />
	</Tooltip>
);
