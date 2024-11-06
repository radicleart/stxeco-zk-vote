<script lang="ts">
	import { pushMessage } from '$lib/connect';
	import { ArrowRightAltOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	const generateProof = async () => {
		const message = {
			message_type: 'ProofGeneration',
			proof_type: 'VdfProof',
			start: '1',
			n: 16
		};
		pushMessage(message);
	};

	onMount(async () => {});
</script>

<div class="w-full shadow-md rounded-lg py-8">
	<div
		class="w-full h-[200px] p-5 flex flex-col justify-between justify-items-stretch text-[#ffffff] bg-secondary-800"
	>
		<button
			on:click={() => generateProof()}
			class="bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200"
		>
			<ArrowRightAltOutline class="inline" /> generate proof
		</button>
	</div>
</div>
