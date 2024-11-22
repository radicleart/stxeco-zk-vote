<script lang="ts">
	import { isLoggedIn, loginStacks } from '@mijoco/stx_helpers/dist/index';
	import { ArrowRightAltOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher, onMount } from 'svelte';
	import { appDetails } from '$lib/config';
	import { logUserOut } from '@mijoco/stx_helpers/dist/account';
	import { connectWallet, disconnectSolanaWallet, isLoggedInSolana } from '$lib/signatures-solana';
	import { sessionStore } from '$stores/stores';
	import bs58 from 'bs58';

	const dispatch = createEventDispatcher();
	let chain: string | undefined = 'stacks';
	let componentKey = 0;

	const bob: number[] = [
		104, 30, 212, 239, 28, 250, 31, 210, 233, 186, 244, 41, 40, 185, 152, 207, 156, 207, 170, 68,
		207, 214, 173, 73, 245, 92, 52, 134, 147, 141, 88, 192
	];

	const getBobPk = async () => {
		const privateKey = new Uint8Array(bob);
		console.log(bs58.encode(privateKey));
	};

	const setChain = async () => {
		sessionStore.update((conf) => {
			conf.preferredChain = chain;
			return conf;
		});
	};

	const setDisconnected = async () => {
		logUserOut();
		dispatch('disconnection');
		disconnectSolanaWallet();
		window.location.reload();
	};

	const setConnected = async () => {
		dispatch('connection');
		if ($sessionStore.preferredChain === 'stacks') {
			await disconnectSolanaWallet();
			loginStacks(appDetails, function (res: boolean) {
				console.log('setConnected: ' + res);
				window.location.reload();
			});
		} else {
			logUserOut();
			const signedMessage = await connectWallet();
			componentKey++;
		}
	};

	onMount(async () => {
		chain = $sessionStore.preferredChain;
		getBobPk();
	});
</script>

<div class="flex flex-col w-full shadow-md rounded-lg py-0 gap-y-5">
	{#key componentKey}
		{#if isLoggedIn() || isLoggedInSolana()}
			<button
				id="connect-wallet"
				class="block w-full items-center gap-x-1.5 bg-primary-01 px-4 py-2 font-normal text-black rounded-lg border border-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50"
				on:keydown
				on:click|preventDefault={() => setDisconnected()}
			>
				Switch account
			</button>
		{:else}
			<!-- <p>Connect wallet to continue;</p>
			<div class="flex flex-col w-full text-base font-extralight gap-2">
				<label for="period">Select chain</label>
				<select
					class="text-black h-10 w-full px-3 border rounded-lg"
					bind:value={chain}
					on:change={() => setChain()}
				>
					<option value={undefined}>Select chain</option>
					<option value={'solana'} selected={chain === 'solana'}>Solana</option>
					<option value={'stacks'} selected={chain === 'stacks'}>Stacks</option>
				</select>
			</div> -->
			{#if chain}
				<button
					id="connect-wallet"
					class="block w-full items-center gap-x-1.5 bg-primary-01 px-4 py-2 font-normal text-black rounded-lg border border-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500/50"
					on:keydown
					on:click={() => setConnected()}
				>
					Connect wallet
				</button>

				<!-- <button
					on:click={() => setConnected()}
					class="w-full bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200"
				>
					<ArrowRightAltOutline class="inline" /> Connect Wallet
				</button> -->
			{/if}
		{/if}
	{/key}
</div>
