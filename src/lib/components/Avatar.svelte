<script lang="ts">
	export let name: string;
	export let type: "self" | "other" = "self";

	const assetPathSelf = "/assets/avatar/self";
	const assetPathOther = "/assets/avatar/other";

	const firstInitial = name?.charAt(0)?.toUpperCase();

	const path = type === "self" ? assetPathSelf : assetPathOther;

	const initial = `${path}/${firstInitial}.svg`

</script>

<img src={initial} alt="profile" />
