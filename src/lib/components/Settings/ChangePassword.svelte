<script lang="ts">
	import { currentUser } from "$lib/stores";
	import StyledButton from "../StyledButton.svelte";
	import StyledInput from "../StyledInput.svelte";


	const showEdit = () => {

	}

</script>

<div class="flex flex-col rounded-xl border-2 border-[#F2F2F2] p-8">
	<h6 class="font-bold mr-auto mb-6">Change Password</h6>

	<div class="flex flex-row items-center ">
		<div class="pl-5 mr-6 w-1/3">
			<span class="mb-2 font-medium text-sm">
				<img src="/assets/label/name.svg" alt="name" class="mr-1 inline" />
				Your Name
			</span>
			<p>{$currentUser.name}</p>
		</div>
		<div class="pl-5 mr-6 w-1/3">
			<span class="mb-2 font-medium text-sm">
				<img src="/assets/label/email.svg" alt="email" class="mr-1 inline" />
				Account Email
			</span>
			<p>{$currentUser.email}</p>
		</div>
		<div class="pl-5 w-1/3">
			<span class="mb-2 font-medium text-sm">
				<img src="/assets/label/permissions.svg" alt="permissions" class="mr-1 inline" />
				Your Permissions
			</span>
			<p>{$currentUser.role}</p>
		</div>
	</div>
	<StyledButton className="ml-auto mt-24 w-32" action={showEdit}>Edit</StyledButton>
</div>