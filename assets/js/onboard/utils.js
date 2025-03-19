/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';

/**
 * Gets the href for an admin page url.
 * @param {string} page    The page name like `plugins.php'.
 * @param {Object} [query] Optionally, specify additional query args.
 * @return {string} The composed path.
 */
export function getAdminUrl( page, query ) {
	let path = window.location.pathname.replace( '/options-general.php', '/' + page );

	if ( query ) {
		path = addQueryArgs( path, query );
	}

	return path;
}
