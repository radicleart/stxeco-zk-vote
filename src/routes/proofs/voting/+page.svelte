<script lang="ts">
	import { goto } from '$app/navigation';
	import UserProofFlow from '$lib/components/proofs/voting/UserProofFlow.svelte';
	import { sessionStore } from '$stores/stores';
	import { ArrowLeftOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	onMount(async () => {});
</script>

<svelte:head>
	<title>zk-stxeco - proof of voting</title>
	<meta name="description" content="Proove ownership of your main accounts" />
</svelte:head>

<div class="w-full py-4 mx-auto max-w-7xl md:px-6">
	<div class="flex flex-col w-full my-2 items-center">
		<div class="w-full mb-1 flex text-sm mt-0 text-gray-500 justify-end max-w-3xl">
			<button
				on:click={() => goto('/')}
				class=" hover:text-primary-600 text-gray-300 font-semibold rounded transition duration-200"
			>
				<ArrowLeftOutline class="inline-block" /> Back
			</button>
		</div>
		{#if $sessionStore.wsConnected}
			<UserProofFlow />
		{/if}
	</div>
</div>
