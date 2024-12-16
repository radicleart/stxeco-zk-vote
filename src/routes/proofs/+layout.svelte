<script lang="ts">
	import { onMount } from 'svelte';
	import { sessionStore } from '$stores/stores';
	import { goto } from '$app/navigation';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { getConfig } from '$stores/store_helpers';
	import { defaultSettings, fetchExchangeRates } from '$lib/connect';
	import {
		initAddresses,
		initApplication,
		isLoggedIn,
		type AddressObject,
		type ExchangeRate
	} from '@mijoco/stx_helpers';
	import { isLoggedInSolana } from '$lib/chains/solana/signatures-solana';
	import { COMMS_ERROR } from '$lib/utils';

	let inited = false;
	let errorReason: string | undefined;
	let componentKey = 0;
	let loggedIn = false;

	const initApp = async () => {
		const network = getConfig().VITE_NETWORK;
		const settings = $sessionStore.userSettings || defaultSettings();
		if (!$sessionStore.keySets || !$sessionStore.keySets[getConfig().VITE_NETWORK]) {
			sessionStore.update((conf) => {
				if (!conf.keySets || !conf.keySets[network]) {
					if (network === 'testnet' || network === 'regtest') {
						conf.keySets = { testnet: {} as AddressObject };
					} else {
						conf.keySets = { mainnet: {} as AddressObject };
					}
				}
				conf.exchangeRates = [] as Array<ExchangeRate>;
				conf.userSettings = settings;
				return conf;
			});
		}
		await initAddresses(getConfig().VITE_NETWORK, sessionStore);
		const exchangeRates = await fetchExchangeRates();
		await initApplication(
			getConfig().VITE_STACKS_API,
			getConfig().VITE_MEMPOOL_API,
			getConfig().VITE_NETWORK,
			sessionStore,
			exchangeRates,
			getConfig().VITE_SBTC_CONTRACT_ID
		);
		componentKey++;
	};

	onMount(async () => {
		try {
			//await transferSol();
			//await checkAndReconnectWallet();
			loggedIn = isLoggedInSolana();
			loggedIn = isLoggedIn();
			//await connectWebSocket();
			inited = true;
			await initApp();
		} catch (err) {
			errorReason = COMMS_ERROR;
			console.log(err);
		}
	});
</script>

<!-- <div class="mx-auto md:w-3/5 w-full p-6 py-6">
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
				</p> -->
<!-- </div>
		</div>
	</div>
</div> -->
<div class="w-full py-4 mx-auto max-w-4xl md:px-6">
	<div class="flex flex-col w-full my-2 items-center">
		<div class="w-full mb-1 flex text-sm mt-0 text-gray-500 justify-end gap-x-5 max-w-3xl">
			<button
				on:click={() => goto('/tx-proof')}
				class=" hover:text-primary-600 text-gray-300 font-semibold rounded transition duration-200"
			>
				<ArrowRightOutline class="inline-block me-5" /> Tx Proof
			</button>
			<button
				on:click={() => goto('/')}
				class=" hover:text-primary-600 text-gray-300 font-semibold rounded transition duration-200"
			>
				Back
			</button>
		</div>
		{#if $sessionStore.wsConnected}
			<slot></slot>
		{/if}
	</div>
</div>
