<script lang="ts">
	import { goto } from '$app/navigation';
	import Introduction from '$lib/polymarket/components/Introduction.svelte';
	import { sessionStore } from '$stores/stores';
	import { ArrowLeftOutline, ArrowRightOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	onMount(async () => {});
</script>

<svelte:head>
	<title>sui polymarket</title>
	<meta name="description" content="polymarket on sui" />
</svelte:head>

<div class="w-full py-4 mx-auto max-w-7xl md:px-6">
	<div class="flex flex-col w-full my-2 items-center">
		<Introduction />
	</div>
</div>
