/**
 * External dependencies
 */
import styled from '@emotion/styled';

/**
 * SolidWP dependencies
 */
import { Surface } from '@ithemes/ui';

/**
 * WordPress dependencies
 */
import { ProgressBar } from '@wordpress/components';

export const StyledContainer = styled( Surface )`
	border: 1px solid ${ ( { theme } ) => theme.colors.border.normal };
	border-radius: 0.75rem;
	padding: 2.5rem 2rem;
	width: 100%;
	max-width: 46rem;
	display: flex;
	gap: 1.25rem;
`;

export const StyledProgressBar = styled( ProgressBar )`
	&& {
		width: 100%;
		height: 0.25rem;
		border-radius: 1rem;
	}
`;
