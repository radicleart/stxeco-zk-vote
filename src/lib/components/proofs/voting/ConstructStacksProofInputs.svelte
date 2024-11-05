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

	const dispatch = createEventDispatcher();
	let balanceAtHeight = 0;
	let stacksAddress: string;
	let msg: string;
	let activeProposals: Array<VotingEventProposeProposal>;

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

	const handleSignMessage = async () => {
		const message = 'Your message here';
		const options = {
			message,
			network: new StacksMainnet(),
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
			stacksAddress = getStacksAddress(getConfig().VITE_NETWORK);
			balanceAtHeight = await getBalanceAtHeight(
				getConfig().VITE_STACKS_API,
				stacksAddress,
				100000
			);
			msg = ``;
		}
	});
</script>

<div class="w-full shadow-md rounded-lg py-8">
	<div
		class="w-full h-[200px] p-5 flex flex-col justify-between justify-items-stretch text-[#ffffff] bg-secondary-800"
	>
		{#if isLoggedIn()}
			<button
				on:click={() => handleSignMessage()}
				class="bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200"
			>
				<ArrowRightAltOutline class="inline" /> provide signature
			</button>
			<p>
				<a class="text-secondary-500 underline" href="/" on:click|preventDefault={() => logout()}
					>Switch to a different stacks account</a
				>
			</p>
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
