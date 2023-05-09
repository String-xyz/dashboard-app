import { NavItem, menuItems } from "$lib/constants";
import { activeTab } from "$lib/stores";

export const openLink = (link: string) => {
	window.open(link, '_blank', 'noreferrer');
}

export const navigateToView = (name: NavItem) => {
	const view = menuItems.find(item => item.name === name) ?? menuItems[0];
	activeTab.set(view);
}