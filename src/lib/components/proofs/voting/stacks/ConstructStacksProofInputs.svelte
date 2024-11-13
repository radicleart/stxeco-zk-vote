<script lang="ts">
	import { getConfig } from '$stores/store_helpers';
	import { getStacksAddress, getBalanceAtHeight } from '@mijoco/stx_helpers/dist/index';
	import { ArrowRightAltOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher, onMount } from 'svelte';
	import { type VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { domain, structuredDataHash, structuredDataSignature } from '$lib/signatures-stacks';
	import { sessionStore } from '$stores/stores';
	import type { MessageInputs, SignatureData } from '$types/local_types';
	import { sign } from '@noble/secp256k1';

	const dispatch = createEventDispatcher();
	let proposal: VotingEventProposeProposal;
	let vote: string;
	let balance_at_height = 0;
	let stacksAddress: string;
	let dataCollectionComplete = false;
	let message_inputs: MessageInputs;
	let signature_data: SignatureData;
	let ready = false;
	let message: string;

	const requestStructuredDataSignature = async () => {
		try {
			message_inputs = {
				message,
				vote,
				proposal: proposal.proposalMeta.title.trim(),
				balance_at_height,
				burn_start_height: proposal.proposalData.burnStartHeight,
				burn_end_height: proposal.proposalData.burnEndHeight
			};
			structuredDataSignature(message_inputs, function (data: any) {
				signature_data = {
					public_key: data.publicKey,
					signature: data.signature,
					hash: structuredDataHash(message_inputs),
					message_inputs,
					message,
					domain
				};
				dispatch('signed', signature_data);
			});
		} catch (error) {
			console.error('Error during signature request:', error);
		}
	};

	onMount(async () => {
		proposal = $sessionStore.currentProposal!;
		stacksAddress = getStacksAddress(getConfig().VITE_NETWORK);
		const result = await getBalanceAtHeight(
			getConfig().VITE_STACKS_API,
			stacksAddress,
			proposal.stackerData?.heights?.stacksStart || proposal.proposalData.startBlockHeight
		);
		balance_at_height = Number(result.stx.balance);
		vote = $sessionStore.currentVote!;
		message = `I vote ${vote === 'for' ? 'in favour of' : 'against'} this proposal`;
		//ready = true;
		requestStructuredDataSignature();
	});
</script>

<div class="flex flex-col w-full text-base font-extralight gap-2">
	{#if ready}
		<div class="grid grid-cols-4 gap-y-3 text-sm">
			<div class="col-span-4 text-2xl">{proposal.proposal.split('.')[1]}</div>
			<div class="col-span-4">{message}</div>
			<div class="col-span-2">vote:</div>
			<div class="col-span-2">{vote}</div>
			<div class="col-span-2">voting-power:</div>
			<div class="col-span-2">{balance_at_height}</div>
			<div class="col-span-2">voting-window-begins:</div>
			<div class="col-span-2">{proposal.proposalData.burnStartHeight}</div>
			<div class="col-span-2">voting-window-ends:</div>
			<div class="col-span-2">{proposal.proposalData.burnEndHeight}</div>
		</div>
		<button
			on:click={() => requestStructuredDataSignature()}
			class="bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200"
		>
			<ArrowRightAltOutline class="inline" /> provide signature
		</button>
	{:else}
		<div>Sign message to express voting intention</div>
	{/if}
</div>
