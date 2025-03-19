import Testimonials from './testimonials';
import Features from './features.js';
import { StyledBodySurface } from './styles';

export default function WelcomeBody( { beginOnboarding } ) {
	return (
		<StyledBodySurface>
			<Testimonials />
			<Features beginOnboarding={ beginOnboarding } />
		</StyledBodySurface>
	);
}
