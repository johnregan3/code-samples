import styled from '@emotion/styled';

import { BackupsIcon, BackupsLogoWhite } from '../../../images';
import backgroundGradientTopRight from '../../../images/background-gradient-top-right.png';

import { Text, Surface } from '@proprietary/ui';

export const StyledContinueText = styled( Text )`
	align-self: flex-end;
`;

export const StyledIntro = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 2.5rem;

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.small }px) {
		flex-direction: row;
		align-items: center;
		margin-top: 2.5rem;
	}

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.xlarge }px) {
		gap: 4rem;
	}
`;

export const StyledOuterTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	max-width: 800px;
`;

export const StyledInnerTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
`;

export const StyledBackupsIcon = styled( BackupsIcon )`
	width: 3.5rem;
	height: 3.5rem;
	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.medium }px) {
		width: 4rem;
		height: 4rem;
	}
`;

export const StyledPricingSurface = styled( Surface )`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1.75rem;
	padding: 9rem 1.5rem;
	background-image: url(${ backgroundGradientTopRight });
	background-size: cover;
	border-radius: 1rem;

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.medium }px) {
		padding: 8.5rem 2rem;
	}

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.large }px) {
		padding: 9rem 3rem;
		box-sizing: border-box;
		min-width: 350px;
		max-width: 425px;
	}
`;

export const StyledWhiteLogo = styled( BackupsLogoWhite )`
	min-width: 200px;
	height: auto;
`;

export const StyledPrice = styled( Text )`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-size: 3.5rem;
	text-wrap: nowrap;
`;
