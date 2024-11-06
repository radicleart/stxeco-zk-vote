<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { sessionStore } from '$stores/stores';
	import { connectWebSocket } from '$lib/connect';

	const unsubscribe1 = sessionStore.subscribe(() => {});
	onDestroy(async () => {
		unsubscribe1();
	});

	onMount(async () => {
		connectWebSocket();
	});
</script>

<div class="min-h-screen flex flex-col justify-start mt-10 items-center bg-black text-white p-6">
	<!-- Header Section -->
	<h1 class="text-center text-4xl font-bold mb-4 text-primary-500">
		Privacy Enhanced DAO and DeFi
	</h1>
	<p class="text-lg mb-2 text-gray-300 text-center max-w-3xl">Control your online identity</p>
	<p class="text-sm mb-8 text-gray-500 text-center leading-tight max-w-2xl">
		Zero knowledge proofs change the way we think about ourselves online and pave the way for
		decentralised digital ownership, finance, advertising and more
	</p>
	<slot></slot>
</div>
