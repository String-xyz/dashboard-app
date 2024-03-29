const assetPath = '/assets/card/';

export enum CARD_NAME { create_key, manage_team, unlock_live, explore_docs };

export const cards: CardItem[] = [
	{
		id: CARD_NAME.create_key,
		icon: assetPath + 'key_icon.svg',
		iconAlt: 'Key',
		title: 'Take String’s API for a spin',
		subtitle: `Try out String's API and see how it can power your application.`,
		btnText: 'Create API Key',
	},
	{
		id: CARD_NAME.manage_team,
		icon: assetPath + 'group_icon.svg',
		iconAlt: 'Team',
		title: 'Your Organization',
		subtitle: `Manage your team's permissions all in one place.`,
		btnText: 'View Organization',
	},
	{
		id: CARD_NAME.unlock_live,
		icon: assetPath + 'shield_icon.svg',
		iconAlt: 'Shield',
		title: 'Unlock production mode',
		subtitle: `Verify your account to begin processing real transactions!`,
		btnText: 'Get Verified',
	},
	{
		id: CARD_NAME.explore_docs,
		icon: assetPath + 'globe_icon.svg',
		iconAlt: 'Globe',
		title: 'Explore our API docs',
		subtitle: `Unlock the full potential of our API - dive into our docs!`,
		btnText: 'Explore Docs',
	}
];

export interface CardItem {
	id: CARD_NAME;
	icon: string;
	iconAlt: string;
	title: string;
	subtitle: string;
	btnText: string;
	action?: () => void;
}