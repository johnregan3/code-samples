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
import { Header, Content } from './settings/components';

const rootElement = document.querySelector( '.solidwp-backups-settings-page' );

function App() {
	return (
		<>
			<Header />
			<Content />
		</>
	);
}

if ( rootElement ) {
	createRoot( rootElement ).render(
		<Root theme={ theme }>
			<App />
		</Root>
	);
}
