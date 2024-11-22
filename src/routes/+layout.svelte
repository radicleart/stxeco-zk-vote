<script lang="ts">
	import '../app.css';
	import { onMount, onDestroy } from 'svelte';
	import { sessionStore } from '$stores/stores';
	import {
		connectWebSocket,
		defaultSettings,
		fetchExchangeRates,
		isWalletConnected
	} from '$lib/connect';
	import { configStore } from '$stores/stores_config';
	import { bob, getTransactionHistory } from '$lib/devnet/transfers';
	import { checkAndReconnectWallet, isLoggedInSolana } from '$lib/signatures-solana';
	import { COMMS_ERROR } from '$lib/utils';
	import HeaderFromComponents from '$lib/components/header/HeaderFromComponents.svelte';
	import Footer from '$lib/components/header/Footer.svelte';
	import { getConfig } from '$stores/store_helpers';
	import {
		initAddresses,
		initApplication,
		isLegal,
		isLoggedIn,
		loginStacksFromHeader
	} from '@mijoco/stx_helpers/dist/account';
	import type {
		AddressObject,
		ExchangeRate,
		PoxInfo,
		SessionStore,
		StacksInfo
	} from '@mijoco/stx_helpers';

	const unsubscribe1 = sessionStore.subscribe(() => {});
	const unsubscribe3 = configStore.subscribe(() => {});
	let inited = false;
	let errorReason: string | undefined;
	let componentKey = 0;
	let loggedIn = false;

	onDestroy(async () => {
		unsubscribe1();
		unsubscribe3();
	});

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

<div
	class="bg-gray-1000 bg-[url('$lib/assets/bg-lines.svg')] bg-cover text-white font-extralight min-h-screen"
>
	{#if inited}
		<HeaderFromComponents />
		<div class="min-h-[calc(100vh-160px)] mx-auto px-6">
			{#if $sessionStore.wsConnected}
				<slot></slot>
			{/if}
		</div>
		<Footer />
	{/if}
</div>
