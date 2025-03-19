import styled from '@emotion/styled';
import { Surface } from '@proprietary/ui';
import { BackupsLogoWhite } from '../../../images';
import backgroundLeft from '../../../images/header-gradient-left.png';
import backgroundCenter from '../../../images/header-gradient-center.png';

export const StyledHeader = styled( Surface )`
	display: flex;
	align-items: center;
	justify-content: center;
	background: url(${ backgroundCenter }) center center no-repeat, url(${ backgroundLeft }) left center no-repeat;
	background-color: #333333;
	background-size: cover;
	text-align: center;
	border-radius: 0.5rem;
	height: 167px;
	margin-bottom : 1.25rem;
         max-width: 2000px;
`;

export const StyledVerticalFlex = styled.div`
	color: #ffffff;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	text-wrap: nowrap;
	flex-direction: column;
	font-size: 0.75rem;
`;

export const StyledWhiteLogo = styled( BackupsLogoWhite )`
	width: 400px;
	max-width: 90%;
	height: auto;
`;
