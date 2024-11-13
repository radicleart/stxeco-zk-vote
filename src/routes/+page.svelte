<script lang="ts">
	import { goto } from '$app/navigation';
	import Introduction from '$lib/components/Introduction.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		goto('/proofs/voting');
	});
</script>

<svelte:head>
	<title>Z-KYC ME</title>
	<meta name="description" content="Prove who you are without handing over the keys" />
</svelte:head>

<div class="w-full py-4 mx-auto max-w-7xl md:px-6">
	<div class="flex flex-col w-full my-8">
		<Introduction />
	</div>
</div>
