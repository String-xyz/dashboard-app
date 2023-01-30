import { getTabByName, activeTab } from '$lib/stores';

export interface CardItem {
	icon: string;
	iconAlt: string;
	title: string;
	subtitle: string;
	btnText: string;
	action?: () => void;
}

const DOCS_URL = import.meta.env.VITE_DOCS_URL;
const KYB_URL = import.meta.env.VITE_KYB_URL;

const assetPath = '/assets/card/';

const teamTab = getTabByName('Manage Team');

const openLink = (link: string) => {
	window.open(link, '_blank', 'noreferrer');
}

export const cards: CardItem[] = [
	{
		icon: assetPath + 'key_icon.svg',
		iconAlt: 'Key',
		title: 'Take String’s API for a spin.',
		subtitle: `Try out String's API and see how it can power your application.`,
		btnText: 'Create API Key',
		action: () => {
			console.log('This is where you would allow them to create an API');
		}
	},
	{
		icon: assetPath + 'group_icon.svg',
		iconAlt: 'Team',
		title: 'Manage Team Members',
		subtitle: `Manage your team's permissions all in one place.`,
		btnText: 'Manage',
		action: () => {
			activeTab.set(teamTab);
		}
	},
	{
		icon: assetPath + 'shield_icon.svg',
		iconAlt: 'Shield',
		title: 'Unlock Live Access',
		subtitle: `Verify your account to unlock full access to live mode.`,
		btnText: 'Get Verified',
		action: () => {
			openLink(KYB_URL);
		}
	},
	{
		icon: assetPath + 'globe_icon.svg',
		iconAlt: 'Globe',
		title: 'Explore our API Docs',
		subtitle: `Unlock the full potential of our API - dive into our docs!`,
		btnText: 'Explore Docs',
		action: () => {
			openLink(DOCS_URL);
		}
	}
];
