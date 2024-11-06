<script lang="ts">
	import { appDetails } from '$lib/config';
	import { getActiveProposals } from '$lib/connect';
	import { getConfig } from '$stores/store_helpers';
	import { logUserOut } from '@mijoco/stx_helpers/dist/account';
	import {
		isLoggedIn,
		loginStacks,
		getStacksAddress,
		getBalanceAtHeight
	} from '@mijoco/stx_helpers/dist/index';
	import { openSignatureRequestPopup } from '@stacks/connect';
	import { StacksMainnet } from '@stacks/network';
	import { ArrowRightAltOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher, onMount } from 'svelte';
	import { type VotingEventProposeProposal } from '@mijoco/stx_helpers/dist/index';
	import { openStructuredDataSignatureRequestPopup } from '@stacks/connect';
	import type { StructuredDataSignaturePayload } from '@stacks/connect';
	import { tupleCV, stringUtf8CV, stringAsciiCV, uintCV } from '@stacks/transactions';
	import { sessionStore } from '$stores/stores';
	import {
		ChainID,
		domain,
		domainCV,
		messageCV,
		structuredDataHash,
		verifySignedMessage
	} from '$lib/structured-sigs';
	import { fmtMicroToStx } from '$lib/utils';
	import GenerateProof from './GenerateProof.svelte';
	import { verifyMessageSignatureRsv } from '@stacks/encryption';

	const dispatch = createEventDispatcher();
	let proposal: VotingEventProposeProposal;
	let balanceAtHeight = 0;
	let stacksAddress: string;
	let dataCollectionComplete = false;
	let proofInputs: any = {};
	let activeProposals: Array<VotingEventProposeProposal>;
	const network = new StacksMainnet();

	const logout = async () => {
		logUserOut();
		window.location.reload();
	};

	const handleAuthenticate = async () => {
		loginStacks(appDetails, function (res: boolean) {
			console.log('handleAuthenticate: ' + res);
			window.location.reload();
		});
	};

	const requestStructuredDataSignature = async () => {
		try {
			const message = {
				message:
					'Your signature of the following message represents your voting intention. \n\n' +
					'Your voting power is the sum of your locked and unlocked balance at the block height when voting began',
				vote: 'for',
				proposal: proposal.proposalMeta.title.trim(),
				balanceAtHeight,
				burnStartHeight: proposal.proposalData.burnStartHeight,
				burnEndHeight: proposal.proposalData.burnEndHeight
			};
			// Open the signature request popup
			const response = await openStructuredDataSignatureRequestPopup({
				message: messageCV(message),
				domain: domainCV,
				network,
				appDetails,
				onFinish: (data: any) => {
					const hash = structuredDataHash(message);
					data.hash = hash;
					console.log('Signature request finished:', data);
					proofInputs.hash = hash;
					proofInputs.publicKey = data.publicKey;
					proofInputs.signature = data.signature;
					proofInputs.message = message;
					proofInputs.domain = domain;
					if (verifySignedMessage(message, proofInputs.publicKey, proofInputs.signature)) {
						dataCollectionComplete = true;
					}
					dataCollectionComplete = true;
				}
			});
		} catch (error) {
			console.error('Error during signature request:', error);
		}
	};

	const handleSignMessage = async () => {
		const message = 'Your message here';
		const options = {
			message,
			network,
			appDetails,
			onFinish: (data: any) => {
				console.log('Signed message data:', data);
			}
		};

		await openSignatureRequestPopup(options);
	};

	onMount(async () => {
		if (isLoggedIn()) {
			activeProposals = await getActiveProposals();
			proposal = activeProposals[0];
			stacksAddress = getStacksAddress(getConfig().VITE_NETWORK);
			const result = await getBalanceAtHeight(
				getConfig().VITE_STACKS_API,
				stacksAddress,
				proposal.stackerData?.heights?.stacksStart || proposal.proposalData.startBlockHeight
			);
			balanceAtHeight = Number(result.stx.balance);
		}
	});
</script>

<div class="w-full shadow-md rounded-lg py-8">
	<div
		class="w-full h-[200px] p-5 flex flex-col justify-between justify-items-stretch text-[#ffffff] bg-secondary-800"
	>
		{#if isLoggedIn()}
			{#if dataCollectionComplete}
				<GenerateProof />
			{:else}
				<button
					on:click={() => requestStructuredDataSignature()}
					class="bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200"
				>
					<ArrowRightAltOutline class="inline" /> provide signature
				</button>
				<p>
					<a class="text-secondary-500 underline" href="/" on:click|preventDefault={() => logout()}
						>Switch to a different stacks account</a
					>
				</p>
			{/if}
		{:else}
			<p>Connect wallet to continue;</p>
			<button
				on:click={() => handleAuthenticate()}
				class="bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200"
			>
				<ArrowRightAltOutline class="inline" /> Connect Wallet
			</button>
		{/if}
	</div>
</div>
