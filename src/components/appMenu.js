import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CottageIcon from '@mui/icons-material/Cottage';
import VideocamIcon from '@mui/icons-material/Videocam';
import HikingIcon from '@mui/icons-material/Hiking';
import InfoIcon from '@mui/icons-material/Info';
import BugReportIcon from '@mui/icons-material/BugReport';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useNavigate } from 'react-router-dom';

const primaryMenuOptions = [
	{
		text: 'Home',
		linkTo: '/',
		isInternal: true,
		icon: <CottageIcon sx={{ color: 'icon.primary' }} />,
	},
	{
		text: 'Top Videos',
		linkTo: '/top-videos',
		isInternal: true,
		icon: <VideocamIcon sx={{ color: 'icon.primary' }} />,
	},
	{
		text: 'Top Channels',
		linkTo: '/top-channels',
		isInternal: true,
		icon: <VideoLibraryIcon sx={{ color: 'icon.primary' }} />,
	},
	{
		text: 'Total Cost',
		linkTo: '/total-cost',
		isInternal: true,
		icon: <HikingIcon sx={{ color: 'icon.primary' }} />,
	},
	{
		text: 'Chrome Plugin',
		linkTo:
			'https://chrome.google.com/webstore/detail/opmdccohfkcfedakekphplpahmjnfgcd/preview?hl=en&authuser=0',
		isInternal: false,
		icon: <ExtensionIcon sx={{ color: 'icon.primary' }} />,
	},
];

const secondaryMenuOptions = [
	{
		text: 'About',
		linkTo: '/about',
		isInternal: true,
		icon: <InfoIcon sx={{ color: 'icon.primary' }} />,
	},
	{
		text: 'Report Bug',
		linkTo: 'https://github.com/ChristopherMWood/opportunitycost.life/issues',
		isInternal: false,
		icon: <BugReportIcon sx={{ color: 'icon.primary' }} />,
	},
];

const AppMenu = props => {
	const navigate = useNavigate();

	const navigateTo = (path, isInternal) => {
		if (isInternal) {
			navigate(path);
		} else {
			window.open(path);
		}
	};

	return (
		<Box
			className='app-drawer'
			sx={{ width: 250 }}
			role='presentation'
			onClick={props.toggleMenu(false)}
			onKeyDown={props.toggleMenu(false)}
		>
			<List>
				{primaryMenuOptions.map(option => (
					<ListItem key={option.text} disablePadding>
						<ListItemButton
							onClick={() => {
								navigateTo(option.linkTo, option.isInternal);
							}}
						>
							<ListItemIcon>{option.icon}</ListItemIcon>
							<ListItemText primary={option.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider color='white' />
			<List>
				{secondaryMenuOptions.map(option => (
					<ListItem key={option.text} disablePadding>
						<ListItemButton
							onClick={() => {
								navigateTo(option.linkTo, option.isInternal);
							}}
						>
							<ListItemIcon>{option.icon}</ListItemIcon>
							<ListItemText primary={option.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default AppMenu;