<script lang="ts">
	import { pushMessage } from '$lib/connect';
	import { sessionStore } from '$stores/stores';
	import { ArrowRightAltOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	const regenerate = async () => {
		dispatch('regenerate');
	};

	onMount(async () => {});
</script>

<div class="w-full shadow-md rounded-lg py-8">
	<div
		class="w-full h-[200px] p-5 flex flex-col justify-between justify-items-stretch text-[#ffffff] bg-secondary-800"
	>
		<div>
			Genrating a zero knowledge proof that your signature is able to vote on the proposal with
			voting power {$sessionStore.signature_data?.message_inputs.balance_at_height}
		</div>
		{#if $sessionStore.wsConnected}
			<div class="flex gap-3">
				<button
					on:click={() => {
						regenerate();
					}}
					class="text-sm font-mono uppercase block w-full px-4 py-2 text-white bg-[#131416] rounded-md border border-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-500/50"
				>
					Generate Proof
				</button>
			</div>
		{/if}
	</div>
</div>
