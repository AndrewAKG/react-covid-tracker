import styled from 'styled-components';
import GoogleMapReact, { Props } from 'google-map-react';

interface MapProps extends Props {
	children?: any;
}

const Wrapper = styled.div`
	width: 100%;
	height: 100vh;
`;

export const GoogleMap = ({ children, ...props }: MapProps) => (
	<Wrapper>
		<GoogleMapReact
			bootstrapURLKeys={{
				key: process.env.REACT_APP_MAP_KEY!
			}}
			{...props}
		>
			{children}
		</GoogleMapReact>
	</Wrapper>
);
