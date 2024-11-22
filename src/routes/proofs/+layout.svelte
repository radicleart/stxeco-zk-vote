<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { sessionStore } from '$stores/stores';

	const unsubscribe1 = sessionStore.subscribe(() => {});
	onDestroy(async () => {
		unsubscribe1();
	});

	onMount(async () => {
		//switchConfig('devnet');
	});
</script>

<div class="mx-auto md:w-3/5 w-full p-6 py-6">
	<div class="my-8">
		<div class="mx-auto w-full">
			<div
				class="flex flex-col w-full p-5 gap-10 items-start border-[0.5px] border-gray-700 rounded-lg"
			>
				<h1 class="text-center text-4xl font-bold mb-2 text-primary-500">Undisclosed!</h1>
				<p class="text-lg mb-2 text-gray-300 text-center max-w-3xl">
					Vote without revealing your address, balance or voting intentions
				</p>
				<p class="text-sm mb-1 text-gray-500 text-center leading-tight max-w-2xl">
					Zero knowledge proofs change the way we think about ourselves online and pave the way for
					decentralised digital ownership, finance, advertising and more
				</p>
				<slot></slot>
			</div>
		</div>
	</div>
</div>
