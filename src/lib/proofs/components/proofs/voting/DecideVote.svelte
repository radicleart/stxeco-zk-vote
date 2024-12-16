<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	let vote: string;

	const castVote = async (vfor: boolean) => {
		if (vfor) vote = 'for';
		else vote = 'against';
		dispatch('decide_vote', vote);
	};

	onMount(async () => {});
</script>

<div class="flex flex-col w-full text-base font-extralight gap-2">
	<div class="flex gap-3">
		<button
			on:click={() => {
				castVote(true);
			}}
			class="text-sm font-mono uppercase block w-full px-4 py-2 text-white bg-[#131416] rounded-md border border-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-500/50"
		>
			Vote yes
		</button>
		<button
			on:click={() => {
				castVote(false);
			}}
			class="text-sm font-mono uppercase block w-full px-4 py-2 text-white bg-[#131416] rounded-md border border-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-500/50"
		>
			Vote no
		</button>
	</div>
</div>
