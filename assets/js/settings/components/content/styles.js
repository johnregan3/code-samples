import styled from '@emotion/styled';
import { Surface, Text } from '@proprietary/ui';

export const StyledContent = styled( Surface )`
	display: flex;
	flex-direction: column;
	padding: 2.5rem 2rem;
	border-radius: 0.5rem;
	box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.08);
	gap: 1rem;
	max-width: calc( 2000px - 4rem );
`;

export const StyledConnectionStatus = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const StyledStatusIndicator = styled( Text, {
	shouldForwardProp: ( prop ) => prop !== 'color',
} )`
	color: ${ ( { color } ) => color };
	&::before {
		order: 1;
	}
`;

export const StyledContentText = styled( Text )`
	display: block;
	margin: 0.5rem 0.75rem;
`;

export const StyledLinkRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-top: 1.5rem;

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.medium }px) {
		flex-direction: row;
	}
`;

export const StyledLinkRowBox = styled( 'a', { shouldForwardProp: ( prop ) => prop !== 'useDisconnectedStyle' } )`
	display: flex;
	flex: 1;
	gap: 3.25rem;
	justify-content: space-between;
	align-items: center;
	border: 1px solid ${ ( { useDisconnectedStyle } ) => useDisconnectedStyle ? '#FF8085' : '#E7E7E7' };
	background-color: ${ ( { useDisconnectedStyle } ) => useDisconnectedStyle ? '#FCF0F1' : 'transparent' };
	border-radius: 0.25rem;
	padding: 1.25rem;
	text-decoration: none;

	&:focus,
	&:hover {
		border-color: ${ ( { useDisconnectedStyle, theme } ) => useDisconnectedStyle ? '#FCF0F1' : theme.colors.primary.base };
		box-shadow: 0 0 0 2px transparent;
	}
`;

export const StyledLinkRowBoxLeft = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const StyledLinkRowBoxText = styled( Text )`
	color: #6c6c6c;
	line-height: 1.33;
`;

export const StyledArrowLink = styled.div`
	line-height: 1;
	&:focus {
		box-shadow: 0 0 0 2px transparent;
	}
`;

export const StyledArrowLinkIcon = styled.span`
	fill: ${ ( { theme } ) => theme.colors.text.accent };
`;
