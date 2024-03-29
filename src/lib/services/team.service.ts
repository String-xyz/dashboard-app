import { get as getStore } from "svelte/store";

import { authService } from ".";
import { formatDate } from "$lib/utils";
import { type TeamItem, Role } from "$lib/common";
import { Filter } from "$lib/constants";
import type { ApiClient, Invite, Member } from "./apiClient";
import { currentUser, activeFilter } from "$lib/stores";

export function createTeamService(apiClient: ApiClient) {
	async function buildTeamItems(): Promise<TeamItem[]> {
		try {
			// get members and invites
			const membersP = apiClient.getMembers();
			const invitesP = apiClient.listInvites();
			const [_members, _invites] = await Promise.all([membersP, invitesP]);

			// merge members and invites
			const mergedItems = mergeMemberAndInvites(_members, _invites);
			return mergedItems;
		} catch (e) {
			console.error(e);
			throw e;
		}
	}

	function filterTeamItems(_teamItems: TeamItem[], filter: Filter) {
		if (filter === Filter.ALL_MEMBERS) {
			const canViewDeactivated = authService.canView(getStore(currentUser).role, Role.ADMIN);
			// sort by [...active, ...invites, ...deactivated]
			const sortedItems = [
				..._teamItems.filter((item) => !item.isInvite && !item.deactivatedAt), // not deactivated members
				..._teamItems.filter((item) => item.isInvite && !item.deactivatedAt), // not revoked invites
				..._teamItems.filter((item) => (item.deactivatedAt || false) && canViewDeactivated) // anything deactivated if they can see it
			];

			return sortedItems;
		}

		if (filter === Filter.PENDING_INVITE) return _teamItems.filter((teamItem) => teamItem.isInvite && teamItem.status === "pending");
		if (filter === Filter.DELETED) return _teamItems.filter((teamItem) => teamItem.deactivatedAt || false);
		if (filter === Filter.ACTIVE) return _teamItems.filter((teamItem) => teamItem.deactivatedAt === undefined && !teamItem.isInvite);

		return _teamItems;
	}

	function mergeMemberAndInvites(_members: Member[], _invites: Invite[]) {
		const _teamItems: TeamItem[] = [];

		_members.forEach((member) => {
			const teamItem: TeamItem = {
				id: member.id,
				name: member.name,
				role: member.role,
				email: member.email,
				joinDate: formatDate(member.createdAt),
				status: "accepted", // if member, status is always accepted
				deactivatedAt: member.deactivatedAt
			}

			if (teamItem.email === getStore(currentUser).email) {
				teamItem.self = true;
				// If it is the current user, put them to the top of the list only
				_teamItems.unshift(teamItem);
				return;
			} else if (teamItem.role === Role.OWNER) {
				_teamItems.splice(1, 0, teamItem);
				return;
			}

			_teamItems.push(teamItem);
		});

		_invites.forEach((invite) => {
			// when invite status is accepted, it is already in the members list
			if (invite.status === "accepted") return;

			_teamItems.push({
				id: invite.id,
				name: invite.name,
				role: invite.role,
				email: invite.email,
				status: invite.status,
				isInvite: true, // pending invites do not have a joined date
			});
		});

		return _teamItems;
	}

	async function rebuildTeamList() {
		const _teamItems = await buildTeamItems();
		return filterTeamItems(_teamItems, getStore(activeFilter).filter);
	}

	return { buildTeamItems, filterTeamItems, mergeMemberAndInvites, rebuildTeamList };
}
