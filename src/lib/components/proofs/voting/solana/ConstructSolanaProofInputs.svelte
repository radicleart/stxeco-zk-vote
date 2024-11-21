<script lang="ts">
	import { getConfig } from '$stores/store_helpers';
	import { getStacksAddress, getBalanceAtHeight } from '@mijoco/stx_helpers/dist/index';
	import { ArrowRightAltOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher, onMount } from 'svelte';
	import { type VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import {
		domain,
		structuredDataHash,
		structuredDataSignature,
		verifySignedMessage
	} from '$lib/signatures-stacks';
	import GenerateProof from '../GenerateProof.svelte';
	import { isLoggedInSolana } from '$lib/signatures-solana';
	import { sessionStore } from '$stores/stores';
	import type { SignatureData } from '$types/local_types';

	const dispatch = createEventDispatcher();
	let proposal: VotingEventProposeProposal;
	let vote: string;
	let balance_at_height = 0;
	let stacksAddress: string;
	let dataCollectionComplete = false;
	let signature_data: SignatureData;
	let ready = false;
	let message: string;

	const requestStructuredDataSignature = async () => {
		try {
			const messageObj = {
				message,
				vote,
				proposal: proposal.proposalMeta.title.trim(),
				balance_at_height,
				block_proof_height: proposal.proposalData.burnStartHeight,
				voting_end_height: proposal.proposalData.burnEndHeight
			};
			const data = structuredDataSignature(messageObj, function (data: any) {
				const hash = structuredDataHash(messageObj);
				data.hash = hash;
				console.log('Signature request finished:', data);
				signature_data.hash = hash;
				signature_data.public_key = data.public_key;
				signature_data.signature = data.signature;
				signature_data.message = message;
				signature_data.domain = domain;
				if (verifySignedMessage(signature_data)) {
					dataCollectionComplete = true;
				}
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
	{#if dataCollectionComplete}
		<GenerateProof />
	{:else}
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
	{/if}
</div>
