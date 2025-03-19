/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useProgress } from './context';

const pluginPath = '/wp/v2/plugins/proprietary-sync/init';

export function useConnect() {
	const { state, dispatch } = useProgress();

	return useMemo( () => {
		return async () => {
			if ( state.isConnecting ) {
				return;
			}

			dispatch( { type: 'CONNECTION_START' } );

			let action = 'checkPlugin';

			while ( action ) {
				dispatch( { type: 'CONNECTION_PROGRESS', action } );

				switch ( action ) {
					case 'checkPlugin':
						action = await checkPlugin( dispatch );
						break;
					case 'activate':
						action = await activatePlugin( dispatch );
						break;
					case 'install':
						action = await installPlugin( dispatch );
						break;
					case 'checkConnection':
						action = await checkExistingConnections( dispatch );
						break;
					case 'connect':
						action = await connect( dispatch );
						break;
					default:
						return;
				}
			}
		};
	}, [ state, dispatch ] );
}

/**
 * Ensures functions last for a given amount of time
 * to ensure the user can understand the UI.
 * @param {number}                ms
 * @param {() => Promise<string>} f
 * @return {Promise<string>} The original promise value.
 */
async function withMinimumTime( ms, f ) {
	const all = await Promise.allSettled( [
		f(),
		new Promise( ( resolve ) => setTimeout( resolve, ms ) ),
	] );

	if ( all[ 0 ].status === 'rejected' ) {
		throw all[ 0 ].reason;
	}

	return all[ 0 ].value;
}

/**
 * Records an error encountered in the connection process.
 * @param {function(object): void} dispatch   Dispatch function.
 * @param {string}                 code       The error code.
 * @param {string}                 message    The error message.
 * @param {Object}                 [response] The original error response, if given, will be wrapped.
 */
function recordError( dispatch, code, message, response ) {
	const error = { code, message };

	if ( response ) {
		const additionalErrors = response.additional_errors;
		delete response.additional_errors;

		error.additional_errors = [ response ];

		if ( additionalErrors ) {
			error.additional_errors.push( ...additionalErrors );
		}
	}

	dispatch( { type: 'CONNECTION_FAILED', error } );
}

async function checkPlugin( dispatch ) {
	try {
		const plugin = await withMinimumTime( 1000, () => apiFetch( { path: pluginPath } ) );
		if ( plugin.status === 'inactive' ) {
			return 'activate';
		}
		return 'checkConnection';
	} catch ( e ) {
		if ( e.code === 'rest_plugin_not_found' ) {
			return 'install';
		}

		return recordError(
			dispatch,
			'codeSamplePlugin.check-failed',
			__( 'The Hub companion plugin could not be installed.', 'codeSamplePlugin' ),
			e
		);
	}
}

async function activatePlugin( dispatch ) {
	try {
		await withMinimumTime( 2000, () => apiFetch( {
			path: pluginPath,
			method: 'PUT',
			data: {
				status: 'active',
			},
		} ) );

		return 'checkConnection';
	} catch ( e ) {
		return recordError(
			dispatch,
			'codeSamplePlugin.activate-failed',
			__( 'The Hub companion plugin could not be activated.', 'codeSamplePlugin' ),
			e
		);
	}
}

async function installPlugin( dispatch ) {
	try {
		await withMinimumTime( 2000, () => apiFetch( {
			path: '/wp/v2/plugins',
			method: 'POST',
			data: {
				slug: 'proprietary-sync',
				status: 'active',
			},
		} ) );

		return 'checkConnection';
	} catch ( e ) {
		return recordError(
			dispatch,
			'codeSamplePlugin.install-failed',
			__( 'The Hub companion plugin could not be installed.', 'codeSamplePlugin' ),
			e
		);
	}
}

async function checkExistingConnections( dispatch ) {
	try {
		const connections = await withMinimumTime( 1000, () => apiFetch( {
			path: '/hub/v1/auth/connections',
		} ) );

		if ( ! connections.length ) {
			return 'connect';
		}

		const dashboard = connections[ 0 ]._links.alternate[ 0 ].href;

		dispatch( { type: 'CONNECTION_EXISTS', dashboardLink: `${ dashboard }/ng-backups` } );

		return '';
	} catch ( e ) {
		if ( e.code === 'rest_no_route' ) {
			return recordError(
				dispatch,
				'codeSamplePlugin.outdated-plugin',
				__( 'The Hub companion plugin is outdated. Please update to v3.2.0 or later.', 'codeSamplePlugin' )
			);
		}

		return recordError(
			dispatch,
			'codeSamplePlugin.connect-failed',
			__( 'Hub could not successfully connect to your site.', 'codeSamplePlugin' ),
			e
		);
	}
}

async function connect( dispatch ) {
	try {
		const { redirect, expires_at: expiresAt } = await withMinimumTime( 5000, () => apiFetch( {
			path: '/hub/v1/auth/start',
			method: 'POST',
			data: {
				type: 'backups-onboard',
			},
		} ) );
		scheduleExpiration( dispatch, expiresAt );

		dispatch( { type: 'CONNECTION_SUCCESS', connectLink: redirect } );

		return '';
	} catch ( e ) {
		if ( e.code === 'rest_no_route' ) {
			return recordError(
				dispatch,
				'codeSamplePlugin.outdated-plugin',
				__( 'The Hub companion plugin is outdated. Please update to v3.2.0 or later.', 'codeSamplePlugin' )
			);
		}

		return recordError(
			dispatch,
			'codeSamplePlugin.connect-failed',
			__( 'Hub could not successfully connect to your site.', 'codeSamplePlugin' ),
			e
		);
	}
}

/**
 * Schedules an action to be dispatched when the link expires.
 * @param {function(object): void} dispatch
 * @param {number}                 expiresAt UNIX timestamp the link expires at.
 */
function scheduleExpiration( dispatch, expiresAt ) {
	// Wait for 30 seconds before the expiresAt time.
	const wait = ( expiresAt * 1000 ) - Date.now() - 3000;
	setTimeout( () => dispatch( { type: 'EXPIRE_LINK' } ), wait );
}
