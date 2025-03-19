import styled from '@emotion/styled';
import { Surface } from '@proprietary/ui';

const StyledPageContainer = styled( Surface )`
	display: flex;
	flex-grow: 2;
	justify-content: center;
	padding: 1.75rem clamp(1rem, 3vw, 6.5rem) clamp(6rem, 12vw, 7.75rem);
`;

const StyledPageContent = styled( Surface )`
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
	background: transparent;
	width: 100%;
	justify-content: ${ ( { justify } ) => justify };

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.medium }px) {
		gap: 4.5rem;
		max-width: 1200px;
	}
`;

export default function PageContainer( { className, variant, justify, children } ) {
	return (
		<StyledPageContainer className={ className } variant={ variant }>
			<StyledPageContent justify={ justify }>{ children }</StyledPageContent>
		</StyledPageContainer>
	);
}
