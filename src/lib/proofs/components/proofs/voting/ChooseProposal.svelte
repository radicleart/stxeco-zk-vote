<script lang="ts">
	import {
		isLoggedIn,
		loginStacks,
		logUserOut,
		type VotingEventProposeProposal
	} from '@mijoco/stx_helpers/dist/index';
	import { createEventDispatcher, onMount } from 'svelte';
	import {
		connectWallet,
		disconnectSolanaWallet,
		isLoggedInSolana
	} from '$lib/chains/solana/signatures-solana';
	import ConnectWallet from './ConnectWallet.svelte';
	import ConstructStacksProofInputs from './stacks/ConstructStacksProofInputs.svelte';
	import GenerateProof from './GenerateProof.svelte';
	import { sessionStore } from '$stores/stores';
	import ConstructSolanaProofInputs from './solana/ConstructSolanaProofInputs.svelte';
	import { appDetails } from '$lib/config';
	import { getProposals, isWalletConnected } from '$lib/connect';

	const dispatch = createEventDispatcher();
	let proposals: Array<VotingEventProposeProposal>;
	let hasProposals = false;
	let thisProposal: VotingEventProposeProposal;

	const selectProposal = async (e: any) => {
		dispatch('proposal_selected', thisProposal);
	};

	const reset = async (e: any) => {
		dispatch('proposal_selected', undefined);
	};

	onMount(async () => {
		proposals = await getProposals();
		hasProposals = proposals && proposals.length > 0;
	});
</script>

<div class="flex flex-col w-full text-base font-extralight gap-2">
	{#if $sessionStore.currentProposal && $sessionStore.currentProposal.proposal}
		<div class="flex justify-between">
			<div>{$sessionStore.currentProposal.proposalMeta.title}</div>
			<div>
				<a
					class="text-secondary-600 text-xs text-right underline"
					href="/"
					on:click|preventDefault={() => reset()}>reset</a
				>
			</div>
		</div>
	{:else}
		<div>
			<label for="period">Select proposal</label>
			<select
				class="text-black h-10 w-full px-3 border rounded-lg"
				bind:value={thisProposal}
				on:change={(e) => selectProposal(e)}
			>
				<option value={undefined}>Select proposal</option>
				{#if hasProposals}
					{#each proposals as proposal}
						<option
							value={proposal}
							selected={$sessionStore.currentProposal &&
								proposal.proposal === $sessionStore.currentProposal?.proposal}
							>{proposal.proposalMeta.title}</option
						>
					{/each}
				{/if}
			</select>
		</div>
	{/if}
</div>
