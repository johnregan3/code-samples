/**
 * External dependencies
 */
import { Markup } from 'interweave';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Proprietary dependencies
 */
import { SurfaceVariant, Button, List, ListItem } from '@proprietary/ui';

/**
 * Internal dependencies
 */
import { PageContainer, ErrorCard } from '../components';
import { getAdminUrl } from '../utils';

export default function Error( { error } ) {
	const [ primaryLink, primaryText ] = getPrimaryAction( error );
	return (
		<PageContainer variant={ SurfaceVariant.PRIMARY } justify="center">
			<ErrorCard
				heading={ error.message }
				actions={ (
					<>
						<Button variant="secondary" href="https://proprietary.com/plugin-docs" text={ __( 'Read Documentation', 'codeSamplePlugin' ) } />
						<Button variant="primary" href={ primaryLink } text={ primaryText } />
					</>
				) }
			>
				{ error.additional_errors && (
					<List>
						{ error.additional_errors.map( ( additional, i ) => (
							<ListItem key={ i }>
								<Markup content={ additional.message } noWrap />
							</ListItem>
						) ) }
					</List>
				) }
			</ErrorCard>
		</PageContainer>
	);
}

function getPrimaryAction( error ) {
	switch ( error.code ) {
		case 'codeSamplePlugin.activate-failed':
			return [
				getAdminUrl( 'plugins.php' ),
				__( 'Activate Plugin', 'codeSamplePlugin' ),
			];
		case 'codeSamplePlugin.install-failed':
			return [
				getAdminUrl( 'plugin-install.php', { s: 'Hub', tab: 'search', type: 'term' } ),
				__( 'Install Hub Plugin', 'codeSamplePlugin' ),
			];
		case 'codeSamplePlugin.outdated-plugin':
			return [
				getAdminUrl( 'update-core.php' ),
				__( 'Update Hub Plugin', 'codeSamplePlugin' ),
			];
		default:
			return [
				'https://proprietary.com/code-sample-plugin-help/',
				__( 'Get Help', 'codeSamplePlugin' ),
			];
	}
}
