<script lang="ts">
	import { authService } from "$lib/services";
	import { currentUser } from "$lib/stores";
	import { Role } from "$lib/types";
	import StyledButton from "../StyledButton.svelte";
	import StyledInput from "../StyledInput.svelte";


	const showEdit = () => {

	}

</script>

<div class="flex flex-col rounded-xl border-2 border-[#F2F2F2] p-8">
	<h6 class="font-bold mr-auto mb-6">Platform Details</h6>

	<div class="flex flex-row items-center ">
		<div class="pl-5 mr-6 w-1/3">
			<span class="mb-2 font-medium text-sm">
				<img src="/assets/label/email.svg" alt="email" class="mr-1 inline" />
				Business Email
			</span>
			<p>mock@email.com</p>
		</div>
		<div class="pl-5 mr-6 w-1/3">
			<span class="mb-2 font-medium text-sm">
				<img src="/assets/label/name.svg" alt="name" class="mr-1 inline" />
				Owner's Name
			</span>
			<p>Mock Name</p>
		</div>
		<div class="pl-5 mr-6 w-1/3">
			<span class="mb-2 font-medium text-sm">
				<img src="/assets/label/company.svg" alt="company" class="mr-1 inline" />
				Company
			</span>
			<p>Mock Inc</p>
		</div>
		<div class="pl-5 w-1/3">
			<span class="mb-2 font-medium text-sm">
				<img src="/assets/label/url.svg" alt="url" class="mr-1 inline" />
				Website URL
			</span>
			<p>mock.com</p>
		</div>
	</div>
	{#if authService.canView($currentUser.role, Role.ADMIN)}
		<StyledButton className="ml-auto mt-24 w-32" action={showEdit}>Edit</StyledButton>
	{/if}
</div>