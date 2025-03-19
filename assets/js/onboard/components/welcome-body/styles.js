import styled from '@emotion/styled';
import { Button, Surface } from '@proprietary/ui';

export const StyledBodySurface = styled( Surface )`
	display: flex;
	flex-direction: column;
	padding: 3rem 1rem 4rem;
	border-radius: 1rem;
	box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.08);
	gap: 3.5rem;

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.medium }px) {
		padding: 3rem 2.5rem 4rem;
		gap: 4.5rem;
	}

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.large }px) {
		padding: 3rem 6.5rem 4rem;
	}
`;

export const StyledTestimonials = styled.div`
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid #e7e7e7;
	gap: 3.5rem;

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.large }px) {
		gap: 4.5rem;
	}
`;

export const StyledTestimonial = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2.5rem;
	margin-bottom: 3.5rem;

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.medium }px) {
		flex-direction: row;
		align-items: flex-start;
	}
`;

export const StyledTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.625rem;

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.large }px) {
		gap: 2.75rem;
	}
`;

export const StyledTestimonialUser = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

export const StyledFeaturesSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
`;

export const StyledFeatures = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
	gap: 2.5rem calc(6vw);
`;

export const StyledFeature = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	@media screen and (min-width: ${ ( { theme } ) => theme.breaks.medium }px) {
		flex-direction: row;
	}
`;

export const StyledFeatureText = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	flex-shrink: 12;
`;

export const StyledPurchaseButton = styled( Button )`
	align-self: center;
	width: 100%;
	max-width: 700px;
`;
