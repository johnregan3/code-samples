import styled from '@emotion/styled';
import { Button, Surface } from '@proprietary/ui';

import { BackupsLogoBlack } from '../../../images';

export const StyledHeaderContainer = styled( Surface, { shouldForwardProp: ( prop ) => prop !== 'currentStep' } )`
	border-bottom: ${ ( { currentStep } ) => currentStep !== 1 && '1px solid #cecece' }
`;

const StyledHeader = styled( Surface )`
	display: grid;
	grid-template-rows: auto auto;
	align-items: center;
	gap: 1.5rem;
	padding: 1rem 0.75rem;

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.medium }px) {
		grid-template-columns: 1fr 1fr;
		padding: 1rem 2.5rem;
	}

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.large }px) {
		grid-template-rows: auto;
		grid-template-columns: 1fr 2fr 1fr;
		gap: 0 1.5rem;
		margin: 0 auto;
		max-width: 2000px;
	}
`;

export const StyledButtonHeader = styled( StyledHeader )`
	grid-template-columns: 1fr;
`;

export const StyledConnectingHeader = styled( StyledHeader )`
	grid-template-columns: 1fr 1fr;
`;

export const StyledLogo = styled( BackupsLogoBlack )`
	max-width: 250px;
`;

export const StyledButtonDivider = styled.div`
	width: 1px;
	background: #cecece;
`;

export const StyledCloseButton = styled( Button )`
	justify-self: end;
	box-shadow: inset 0 0 0 1px transparent !important;

	& svg {
		fill: ${ ( { theme } ) => theme.colors.text.normal };
	}

	& :hover {
		box-shadow: inset 0 0 0 1px ${ ( { theme } ) => theme.colors.primary.base } !important;
	}
`;

export const StyledActions = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 1rem;

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.medium }px) {
		justify-content: flex-end;
	}
`;
