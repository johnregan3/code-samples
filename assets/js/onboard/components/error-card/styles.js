/**
 * External dependencies
 */
import styled from '@emotion/styled';

/**
 * SolidWP dependencies
 */
import { Surface } from '@ithemes/ui';

export const StyledErrorCard = styled( Surface )`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	align-items: center;
	border: 1px solid ${ ( { theme } ) => theme.colors.border.normal };
	border-radius: 0.75rem;
	padding: 2rem;
	max-width: 60ch;
	width: 100%;
	align-self: center;
`;

export const StyledActionsContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	gap: 0.75rem;
	
	& > * {
		flex: 1;
	}
`;
