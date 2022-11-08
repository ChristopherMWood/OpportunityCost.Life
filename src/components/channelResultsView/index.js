import './styles.scss';
import React, { useState } from 'react';
import { Box, Stack, Container } from '@mui/system';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import copy from 'copy-to-clipboard';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CostBlocks from '../costBlocks/costBlocks';
import EventCostBlocks from '../eventCostBlocks/eventCostBlocks';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function ChannelResultsView(props) {
	const [copiedToClipboardOpen, setCopiedToClipboardOpen] = useState(false);

	const copyUrlToClipboard = event => {
		event.preventDefault();

		if (!copiedToClipboardOpen) {
			copy(window.location.href);
			setCopiedToClipboardOpen(true);
		}
	};

	const handleShareNotificationClose = () => {
		setCopiedToClipboardOpen(false);
	};

	return (
		<div className='results-container'>
			<Box>
				<Stack spacing={5}>
					<Container>
						<Stack direction='row' justifyContent='center' spacing={2}>
							<Button
								onClick={copyUrlToClipboard}
								variant='outlined'
								startIcon={<ShareIcon />}
							>
								Share
							</Button>
							<Button
								onClick={props.onReset}
								variant='contained'
								endIcon={<RestartAltIcon />}
							>
								Reset
							</Button>
						</Stack>
						<Snackbar
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							open={copiedToClipboardOpen}
							onClose={handleShareNotificationClose}
							message='URL Copied to Clipboard'
							autoHideDuration={3000}
						>
							<Alert
								onClose={handleShareNotificationClose}
								severity='success'
								sx={{ width: '100%' }}
							>
								URL Copied to Clipboard!
							</Alert>
						</Snackbar>
					</Container>
					<Link
						href={'https://www.youtube.com/channel/' + props.channelId}
						target='_blank'
						rel='noreferrer'
						variant='h4'
						align='center'
					>
						{'Opportunity cost of Channel "' + props.data.name + '"'}
					</Link>
					<CostBlocks totalSeconds={props.data.opportunityCost} />
					<EventCostBlocks totalSeconds={props.data.opportunityCost} />
				</Stack>
			</Box>
		</div>
	);
}

export default ChannelResultsView;