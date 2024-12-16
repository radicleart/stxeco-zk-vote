<script lang="ts">
	import { goto } from '$app/navigation';
	import Introduction from '$lib/proofs/components/Introduction.svelte';
	import UserProofFlow from '$lib/proofs/components/proofs/voting/UserProofFlow.svelte';
	import { sessionStore } from '$stores/stores';
	import { ArrowLeftOutline, ArrowRightOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	onMount(async () => {});
</script>

<svelte:head>
	<title>zk-stxeco - proof of voting</title>
	<meta name="description" content="Proove ownership of your main accounts" />
</svelte:head>

<div class="w-full py-4 mx-auto max-w-7xl md:px-6">
	<div class="flex flex-col w-full my-2 items-center">
		{#if $sessionStore.wsConnected}
			<UserProofFlow />
		{/if}
	</div>
</div>
