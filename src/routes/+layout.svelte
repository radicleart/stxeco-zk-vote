<script lang="ts">
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';
	import { sessionStore } from '$stores/stores';
	import { connectWebSocket } from '$lib/connect';
	import { configStore } from '$stores/stores_config';
	import { bob, getTransactionHistory } from '$lib/devnet/transfers';
	import { checkAndReconnectWallet } from '$lib/signatures-solana';

	const unsubscribe1 = sessionStore.subscribe(() => {});
	const unsubscribe3 = configStore.subscribe(() => {});

	onDestroy(async () => {
		unsubscribe1();
		unsubscribe3();
	});

	onMount(async () => {
		//await transferSol();
		await checkAndReconnectWallet();
		const thBob = await getTransactionHistory(bob);
		const thAlice = await getTransactionHistory(bob);
		await connectWebSocket();
	});
</script>

<div class="bg-black text-white min-h-screen relative flex flex-col">
	<div class="py-4 mx-auto max-w-3xl md:px-6">
		{#if $sessionStore.wsConnected}
			<slot></slot>
		{/if}
	</div>
</div>
