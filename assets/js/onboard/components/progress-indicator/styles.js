import styled from '@emotion/styled';
import { Text } from '@proprietary/ui';

export const StyledProgressIndicator = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	grid-area: 2/1/2/-1;

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.medium }px) {
		grid-area: 2/1/2/3;
	};

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.large }px) {
		grid-area: initial;
	}
`;

export const StyledStep = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

export const StyledStepNumber = styled( Text )`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 1.5rem;
	width: 1.5rem;
	border-radius: 50%;
`;

export const StyledInactiveStepNumber = styled( StyledStepNumber )`
	background: ${ ( { theme } ) => theme.colors.surface.primaryContrast };
`;

export const StyledActiveStepNumber = styled( StyledStepNumber )`
	background: ${ ( { theme } ) => theme.colors.surface.primaryAccent };
`;

export const StyledErrorStepNumber = styled( StyledStepNumber )`
	background: #d63638;
`;

export const StyledLabel = styled( Text, { shouldForwardProp: ( prop ) => prop !== 'hasError' } )`
	color: ${ ( { hasError, theme } ) => hasError ? '#d63638' : theme.colors.text.accent };
`;

export const StyledDivider = styled.div`
	width: 1px;
	background: ${ ( { theme } ) => theme.colors.surface.primaryContrast };
	align-self: stretch;
`;
