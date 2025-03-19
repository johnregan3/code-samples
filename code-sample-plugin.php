<?php
/**
 * Plugin Name: Code Sample Plugin
 * Plugin URI: https://regan.dev
 * Description: A code sample plugin
 * Author: johnregan3
 * Author URI: https://regan.dev
 * Version: 0.0.1
 * Text Domain: code-sample-plugin
 * Domain Path: /lang
 * Network: True
 * License: GPLv2
 * Requires at least: 6.5
 * Requires PHP: 7.4
 *
 * @package Code_Sample_Plugin
 */

define( 'CODE_SAMPLE_PLUGIN_FILE', __FILE__ );

if ( ! function_exists( 'code_sample_plugin_register_updater' ) ) {
	/**
	 * Register the plugin with the Proprietary Updater.
	 *
	 * @param Proprietary_Updater_Settings $updater The Updater Settings.
	 *
	 * @return void
	 */
	function code_sample_plugin_register_updater( Proprietary_Updater_Settings $updater ) {
		$updater->register( 'code-sample-plugin', __FILE__ );
	}

	add_action( 'proprietary_updater_register', 'code_sample_plugin_register_updater' );

	if ( file_exists( __DIR__ . '/lib/updater/load.php' ) ) {
		require_once __DIR__ . '/lib/updater/load.php';
	}
}


/**
 * Render the settings page.
 *
 * @return void
 */
function code_sample_plugin_settings_page_html() {
	?>
	<div class="wrap code-sample-plugin-settings-page"></div>
	<?php
}

/**
 * Load the onboard page scripts.
 *
 * @return void
 */
function code_sample_plugin_load_onboard_page_scripts() {
	$plugin_path = realpath( plugin_dir_path( CODE_SAMPLE_PLUGIN_FILE ) ) . '/';
	$asset_path  = $plugin_path . 'dist/onboard.asset.php';
	if ( ! file_exists( $asset_path ) ) {
		return;
	}
	$script_meta = include $asset_path;

	add_action(
		'admin_enqueue_scripts',
		function () use ( $script_meta ) {
			$url_path = trailingslashit( plugin_dir_url( CODE_SAMPLE_PLUGIN_FILE ) );
			// Enqueue the settings page scripts.
			wp_enqueue_script( 'code-sample-plugin-onboard', $url_path . 'dist/onboard.js', $script_meta['dependencies'], $script_meta['version'], true );
		}
	);
}

/**
 * Load the settings page scripts.
 *
 * @return void
 */
function code_sample_plugin_load_settings_page_scripts() {
	$plugin_path = realpath( plugin_dir_path( CODE_SAMPLE_PLUGIN_FILE ) ) . '/';
	$asset_path  = $plugin_path . 'dist/settings.asset.php';
	if ( ! file_exists( $asset_path ) ) {
		return;
	}
	$script_meta = include $asset_path;

	add_action(
		'admin_enqueue_scripts',
		function () use ( $script_meta ) {
			$site_id = code_sample_plugin_get_hub_site_id();

			$url_path = trailingslashit( plugin_dir_url( CODE_SAMPLE_PLUGIN_FILE ) );

			// Enqueue the settings page scripts.
			wp_enqueue_script( 'code-sample-plugin-settings', $url_path . 'dist/settings.js', $script_meta['dependencies'], $script_meta['version'], true );

			wp_add_inline_script('code-sample-plugin-settings', 'window.backupsExports = ' . json_encode( [
					'site_id'        => $site_id,
					'status'         => code_sample_plugin_get_connection_status( $site_id ),
					'is_authed_user' => code_sample_plugin_is_authed_user( $site_id ),
					'links'          => [
						'timeline' => apply_filters( 'sync_api_request_url', 'https://proprietary-api.com/timeline?' . build_query(
								[
									'filters' => [
										[
											'field' => 'site',
											'value' => [ $site_id ],
											'operator' => 'isAny'
										]
									]
								]
							)
						),
						'edit_connection' => apply_filters( 'sync_api_request_url', "https://proprietary-api.com/site/$site_id/backups" ),
					]
				]
			), 'before' );
		}
	);
}

/**
 * Load the onboard page styles.
 *
 * @return void
 */
function code_sample_plugin_load_onboard_page_styles() {
	remove_all_actions( 'all_admin_notices' );
	remove_all_actions( 'network_admin_notices' );
	remove_all_actions( 'admin_notices' );

	wp_enqueue_style( 'code-sample-plugin-onboard', plugins_url( 'assets/css/onboard.css', __FILE__ ), [ 'wp-components' ] );
}

/**
 * Load the settings page styles.
 *
 * @return void
 */
function code_sample_plugin_load_settings_page_styles() {
	remove_all_actions( 'all_admin_notices' );
	remove_all_actions( 'network_admin_notices' );
	remove_all_actions( 'admin_notices' );
	wp_enqueue_style( 'wp-components' );
}

/**
 * Check if the user has already completed the onboarding steps.
 *
 * @return bool
 */
function code_sample_plugin_user_has_onboarded() {
	if ( ! is_plugin_active( 'proprietary-sync/init.php' ) ) {
		return false;
	}

	if ( empty( code_sample_plugin_get_authentications() ) ) {
		return false;
	}

	if ( ! isset( $GLOBALS['proprietary_updater_path'] ) ) {
		return false;
	}

	include_once $GLOBALS['proprietary_updater_path'] . '/keys.php';

	$license_keys = Proprietary_Updater_Keys::get( [ 'code-sample-plugin' ] );
	return ( ! empty( $license_keys['code-sample-plugin'] ) );
}

/**
 * Add the settings page to the admin menu.
 *
 * @return void
 */
function code_sample_plugin_settings_page() {
	$page = add_submenu_page(
		'options-general.php',
		__( 'Code Sample Plugin', 'code-sample-plugin' ),
		__( 'Code Sample Plugin', 'code-sample-plugin' ),
		'manage_options',
		'code-sample-plugin',
		'code_sample_plugin_settings_page_html'
	);

	if ( code_sample_plugin_user_has_onboarded() ) {
		add_action( "load-{$page}", 'code_sample_plugin_load_settings_page_scripts' );
		add_action( "load-{$page}", 'code_sample_plugin_load_settings_page_styles' );
	} else {
		add_action( "load-{$page}", 'code_sample_plugin_load_onboard_page_scripts' );
		add_action( "load-{$page}", 'code_sample_plugin_load_onboard_page_styles' );
	}
}
add_action( 'admin_menu', 'code_sample_plugin_settings_page' );

/**
 * Link to the Proprietary Hub onboarding sequence on WordPress 6.5.
 *
 * The onboarding JS requires WordPress 6.6. For users who are on older
 * WordPress versions, we redirect them to the Proprietary Hub to complete onboarding.
 *
 * @return void
 */
function code_sample_plugin_override_onboard_link() {
	if ( code_sample_plugin_user_has_onboarded() ) {
		return;
	}

	require ABSPATH . WPINC . '/version.php';

	if ( version_compare( $wp_version, '6.6', '>=' ) ) {
		return;
	}

	global $submenu;

	foreach ( $submenu['options-general.php'] as $key => $menu_item ) {
		if ( $menu_item[2] !== 'code-sample-plugin' ) {
			continue;
		}

		$submenu['options-general.php'][ $key ][2] = 'https://proprietary-hub.com/onboard/backups';
	}
}

add_action( 'admin_head', 'code_sample_plugin_override_onboard_link' );

/**
 * Get the authentications from the Proprietary sync plugin.
 *
 * @return array
 */
function code_sample_plugin_get_authentications() {
	if ( ! isset( $GLOBALS['proprietary-sync-settings'] ) ) {
		return [];
	}
	$sync_settings = $GLOBALS['proprietary-sync-settings'];
	return $sync_settings->get_option( 'authentications' );
}

/**
 * Get the Connection Status from the Proprietary Hub.
 *
 * @param int|string $site_id The Hub Site ID.
 *
 * @return string
 */
function code_sample_plugin_get_connection_status( $site_id ) {

	// Check if we already have the status.
	$ping_status = get_transient( "proprietary_api_ping_$site_id" );
	$has_status  = $ping_status && isset( $ping_status['backups']['connection_status'] );

	// If the status is 'unknown', check for it again.
	if ( $has_status && 'unknown' === $ping_status['backups']['connection_status'] ) {
		$has_status = false;
	}

	if ( ! $has_status ) {
		// Run the ping check.
		require_once $GLOBALS['proprietary_sync_path'] . '/server.php';

		$result = $GLOBALS['proprietary-sync-settings']->do_ping_check( $site_id );

		if ( ! is_wp_error( $result ) && isset( $result['success'] ) ) {
			unset( $result['success'] );
			set_transient( "proprietary_ping_$site_id", $result, DAY_IN_SECONDS );

			$ping_status = $result;
			if ( isset ( $ping_status['connection']['connection_status'] ) ) {
				$has_status = true;
			}
		}
	}

	if ( ! $has_status ) {
		return 'unknown';
	}

	return $ping_status['connection']['connection_status'];
}

/**
 * Get the current user's Hub's site ID.
 *
 * If a Hub user is currently logged in, this will
 * return their Hub Site ID.
 *
 * If the current user has not authorized with the Hub,
 * this will return the first Hub Site ID in the list.
 *
 * @return int
 */
function code_sample_plugin_get_hub_site_id() {
	$authentications = code_sample_plugin_get_authentications();
	$current_user    = wp_get_current_user();
	$user_login      = $current_user->user_login;

	foreach( $authentications as $site_id => $data ) {
		if ( ! isset( $data['local_user'] ) ) {
			continue;
		}
		if ( $data['local_user'] === $user_login ) {
			return (int) $site_id;
		}
	}
	return (int) array_keys( $authentications )[0];
}

/**
 * Check if the current user is the one who authenticated with the Hub.
 *
 * This is used to display different content to the user who authenticated.
 *
 * @param int|string $site_id Hub Site ID.
 *
 * @return bool
 */
function code_sample_plugin_is_authed_user( $site_id ) {
	$authentications = code_sample_plugin_get_authentications();
	$current_user    = wp_get_current_user();
	$user_login      = $current_user->user_login;

	// Sanity check.
	if ( ! isset( $authentications[ (int) $site_id ] ) ) {
		return false;
	}

	return $authentications[ (int) $site_id ]['local_user'] === $user_login;
}
