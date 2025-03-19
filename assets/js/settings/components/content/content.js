import { createInterpolateElement, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, Text, TextSize, TextVariant } from '@proprietary/ui';
import ConnectionStatus from './connection-status.js';
import LinkRowBox from './link-row-box.js';
import { StyledContent, StyledContentText, StyledLinkRow } from './styles';

const { links: hubLinks, site_id: siteId, status: initialStatus, is_authed_user: isAuthedUser } = window.backupsExports;

export default function Content() {
	const [ connectionStatus, setConnectionStatus ] = useState( initialStatus );

	useEffect( () => {
		const handleSend = ( event, data ) => {
			data.proprietary_ping = {
				site_id: siteId,
			};
		};

		const handleTick = ( event, data ) => {
			if ( ! data.proprietary_ping ) {
				return;
			}

			const status = data.proprietary_ping?.backups?.connection_status || 'unknown';
			setConnectionStatus( status );
		};

		jQuery( document ).on( 'heartbeat-send', handleSend );
		jQuery( document ).on( 'heartbeat-tick', handleTick );

		return () => {
			jQuery( document ).off( 'heartbeat-send', handleSend );
			jQuery( document ).off( 'heartbeat-tick', handleTick );
		};
	}, [ setConnectionStatus ] );

	return (
		<StyledContent>
			<ConnectionStatus connectionStatus={ connectionStatus } />
			<Text
				size={ TextSize.SUBTITLE_SMALL }
				variant={ TextVariant.MUTED }
				text={ __( 'Rest easy knowing this site is being backed up to cloud storage from Proprietary. Since backups are powered by Proprietary servers, you can view, manage, download, and restore backups from Hub.', 'codeSamplePlugin' ) }
			/>
			{ isAuthedUser &&
				<StyledLinkRow >
					<LinkRowBox
						title={ __( 'View Backups in your site Timeline ', 'codeSamplePlugin' ) }
						text={ __( 'View backups, create/download archive files, and restore your site with one click! Find all this and more on this site’s Activity Timeline in the Hub.', 'codeSamplePlugin' ) }
						url={ hubLinks.timeline }
					/>
					<LinkRowBox
						title={ __( 'Edit connection details ', 'codeSamplePlugin' ) }
						text={ __( 'Need to change your site details or fix your site’s connection? Edit your server credentials and site connection details by clicking here.', 'codeSamplePlugin' ) }
						url={ hubLinks.edit_connection }
						isDisconnected={ isDisconnected( connectionStatus ) }
					/>
				</StyledLinkRow>
			}
			<StyledContentText
				text={
					createInterpolateElement(
						__( '<a>Learn more about the Hub</a>', 'codeSamplePlugin' ),
						{ a: <Button variant="link" /> }
					)
				} />
		</StyledContent>
	);
}

function isDisconnected( connectionStatus ) {
	return ( connectionStatus === 'failed' ) || ( connectionStatus === 'disconnected' );
}
