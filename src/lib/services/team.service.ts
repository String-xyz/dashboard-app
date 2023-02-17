import type { ApiClient, Invite, Member } from "./apiClient";
import type { TeamItem } from "$lib/types";
import { Filter } from "$lib/stores";

const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
const formatLocaleDate = (date: string) => new Date(date).toLocaleDateString('en-US', dateOptions);

export function createTeamService(apiClient: ApiClient) {
	async function buildTeamItems(currentUser: Member): Promise<TeamItem[]> {
		try {
			// get members and invites
			const membersP = apiClient.getMembers();
			const invitesP = apiClient.listInvites();
			const [_members, _invites] = await Promise.all([membersP, invitesP]);

			// merge members and invites
			const mergedItems = mergeMemberAndInvites(_members, _invites, currentUser);
			return mergedItems;
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	function filterTeamItems(_teamItems: TeamItem[], filter: Filter) {
		if (filter === Filter.ALL_MEMBERS) {

			// sort by [...active, ...invites, ...deactivated]
			const sortedItems = [
				..._teamItems.filter((item) => !item.isInvite && !item.deactivatedAt), // not deactivated members
				..._teamItems.filter((item) => item.isInvite && !item.deactivatedAt), // not revoked invites
				..._teamItems.filter((item) => item.deactivatedAt || false) // anything deactivated
			];

			return sortedItems;
		}

		if (filter === Filter.PENDING_INVITE) return _teamItems.filter((teamItem) => teamItem.isInvite && teamItem.status === 'pending');
		if (filter === Filter.DELETED) return _teamItems.filter((teamItem) => teamItem.deactivatedAt || false);
		if (filter === Filter.ACTIVE) return _teamItems.filter((teamItem) => teamItem.deactivatedAt === undefined && !teamItem.isInvite);

		return _teamItems;
	}

	function mergeMemberAndInvites(_members: Member[], _invites: Invite[], currentUser: Member) {
		const _teamItems = _members.map((member): TeamItem => {
			const teamItem: TeamItem = {
				id: member.id,
				name: member.name,
				role: member.role,
				email: member.email,
				joinDate: formatLocaleDate(member.createdAt),
				status: 'accepted', // if member, status is always accepted
				deactivatedAt: member.deactivatedAt,
			};
			
			if (teamItem.email === currentUser.email) teamItem.self = true; // add self flag to current user so we can style it differently

			return teamItem;
		});

		_invites.forEach((invite) => {
			// when invite status is accepted, it is already in the members list
			if (invite.status === 'accepted') return;

			_teamItems.push({
				id: invite.id,
				name: invite.name,
				role: invite.role,
				email: invite.email,
				status: invite.status,
				isInvite: true, // pending invites do not have a joined date
				deactivatedAt: invite.deactivatedAt,
			});
		});

		return _teamItems;
	}

	return { buildTeamItems, filterTeamItems, mergeMemberAndInvites };
}
