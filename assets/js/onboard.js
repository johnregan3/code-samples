/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';

/**
 * SolidWP dependencies
 */
import { solidTheme as theme, Root } from '@ithemes/ui';

/**
 * Internal dependencies
 */
import { ProgressProvider, useProgress } from './onboard/store/context';
import { Header } from './onboard/components';
import { Connect, Error, Login, Welcome } from './onboard/pages';

const rootElement = document.querySelector( '.solidwp-backups-settings-page' );

function App() {
	return (
		<>
			<Header />
			<Content />
		</>
	);
}

function Content() {
	const { state, dispatch } = useProgress();

	if ( state.error ) {
		return <Error dispatch={ dispatch } error={ state.error } />;
	}

	if ( state.currentStep === 1 ) {
		return <Welcome dispatch={ dispatch } />;
	}

	if ( state.currentStep === 2 ) {
		return <Connect dispatch={ dispatch } />;
	}

	if ( state.currentStep === 3 ) {
		return <Login connectLink={ state.connectLink } isExisting={ state.connectionExists } isExpired={ state.linkExpired } />;
	}

	return null;
}

if ( rootElement ) {
	createRoot( rootElement ).render(
		<Root theme={ theme }>
			<ProgressProvider>
				<App />
			</ProgressProvider>
		</Root>
	);
}
