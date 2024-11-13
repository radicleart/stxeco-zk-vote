<script lang="ts">
	import {
		isLoggedIn,
		loginStacks,
		logUserOut,
		type VotingEventProposeProposal
	} from '@mijoco/stx_helpers/dist/index';
	import { createEventDispatcher, onMount } from 'svelte';
	import { connectWallet, disconnectSolanaWallet, isLoggedInSolana } from '$lib/signatures-solana';
	import ConnectWallet from './ConnectWallet.svelte';
	import ConstructStacksProofInputs from './stacks/ConstructStacksProofInputs.svelte';
	import GenerateProof from './GenerateProof.svelte';
	import { sessionStore } from '$stores/stores';
	import ConstructSolanaProofInputs from './solana/ConstructSolanaProofInputs.svelte';
	import { appDetails } from '$lib/config';
	import { isWalletConnected, pushMessage } from '$lib/connect';
	import ChooseProposal from './ChooseProposal.svelte';
	import DecideVote from './DecideVote.svelte';
	import { verifySignedMessage } from '$lib/signatures-stacks';

	const dispatch = createEventDispatcher();
	let currentProposal: VotingEventProposeProposal;
	let vote: string;
	let signatureVerified: boolean;
	let status: ProofStatus;
	let componentKey = 0;

	const enum ProofStatus {
		CHOOSE_PROPOSAL,
		DECIDE_VOTE,
		GATHER_SIGNATURE,
		GENERATE_PROOF
	}
	const setConnected = async () => {
		if ($sessionStore.preferredChain === 'stacks') {
			await disconnectSolanaWallet();
			await resetSession();
			loginStacks(appDetails, function (res: boolean) {
				console.log('handleAuthenticate: ' + res);
				window.location.reload();
			});
		} else {
			await resetSession();
			logUserOut();
			const signedMessage = await connectWallet();
			componentKey++;
		}
	};

	const setProposal = async (e: any) => {
		currentProposal = e.detail;
		sessionStore.update((conf) => {
			conf.currentProposal = currentProposal;
			return conf;
		});
		if (currentProposal) status = ProofStatus.DECIDE_VOTE;
		else status = ProofStatus.CHOOSE_PROPOSAL;
		componentKey++;
	};

	const setSignature = async (e: any) => {
		const signature_data = e.detail;
		signatureVerified = verifySignedMessage(signature_data);

		sessionStore.update((conf) => {
			conf.signature_data = signature_data;
			return conf;
		});
		status = ProofStatus.GENERATE_PROOF;
		//await generateProof();
		componentKey++;
	};

	const resetSession = async () => {
		sessionStore.update((conf) => {
			conf.currentProposal = undefined;
			conf.currentVote = undefined;
			conf.signature_data = undefined;
			return conf;
		});
		status = ProofStatus.CHOOSE_PROPOSAL;
		componentKey++;
	};

	const setDisconnected = async () => {
		logUserOut();
		disconnectSolanaWallet();
		window.location.reload();
	};

	const setVote = async (e: any) => {
		const currentVote = e.detail;
		sessionStore.update((conf) => {
			conf.currentVote = currentVote;
			return conf;
		});
		status = ProofStatus.GATHER_SIGNATURE;
		componentKey++;
	};

	const generateProof = async () => {
		const message = {
			message_type: 'ProofGeneration',
			proof_type: 'StacksVotingProof',
			signature_data: $sessionStore.signature_data
		};
		pushMessage(message);
	};

	onMount(async () => {
		status = ProofStatus.CHOOSE_PROPOSAL;
		if ($sessionStore.currentProposal) status = ProofStatus.DECIDE_VOTE;
		if ($sessionStore.currentVote) status = ProofStatus.GATHER_SIGNATURE;
		if ($sessionStore.signature_data) {
			status = ProofStatus.GENERATE_PROOF;
			await generateProof();
		}
	});
</script>

<div class="w-full shadow-md rounded-lg py-0">
	<div
		class="w-full min-w-full h-auto p-5 gap-y-5 flex flex-col justify-between justify-items-stretch text-[#ffffff] bg-secondary-800 rounded-lg"
	>
		{#key componentKey}
			{#if isWalletConnected()}
				<ChooseProposal on:proposal_selected={setProposal} />
				{#if status === ProofStatus.DECIDE_VOTE}
					<DecideVote on:decide_vote={setVote} />
				{:else if status === ProofStatus.GATHER_SIGNATURE && $sessionStore.currentProposal}
					{#if $sessionStore.preferredChain === 'stacks'}
						<ConstructStacksProofInputs on:signed={setSignature} />
					{:else}
						<ConstructSolanaProofInputs on:signed={setSignature} />
					{/if}
				{:else if status === ProofStatus.GENERATE_PROOF}
					<GenerateProof on:regenerate={generateProof} />
				{/if}
			{/if}
			<ConnectWallet on:connection={setConnected} on:disconnection={setDisconnected} />
		{/key}
	</div>
</div>
