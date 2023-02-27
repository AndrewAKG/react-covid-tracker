import styled from 'styled-components';

interface MarkerProps {
	text: string;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
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
	cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};
	&:hover {
		z-index: 1;
	}
`;

export const Marker = ({ text, onClick }: MarkerProps) => (
	<Wrapper onClick={onClick}>{text}</Wrapper>
);
