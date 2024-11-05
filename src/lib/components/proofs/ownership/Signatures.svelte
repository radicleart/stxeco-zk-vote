<script lang="ts">
	import { goto } from '$app/navigation';
	import Ethereum from './Ethereum.svelte';
	import Solana from './Solana.svelte';
	import Stacks from './Stacks.svelte';
	import { sessionStore } from '$stores/stores';
	import { CHAIN, type OwnershipProofData } from '$types/local_types';
	import DisplayKeyInfo from './DisplayKeyInfo.svelte';
	import {
		ArrowDownOutline,
		ArrowLeftOutline,
		ArrowRightAltOutline,
		ArrowUpRightDownLeftOutline
	} from 'flowbite-svelte-icons';

	let activeStep = true;
	const ethKeyId: OwnershipProofData | undefined = $sessionStore.proofs?.ownershipData?.find(
		(o) => o.chain === CHAIN.ETHEREUM
	);
	const solKeyId: OwnershipProofData | undefined = $sessionStore.proofs?.ownershipData?.find(
		(o) => o.chain === CHAIN.SOLANA
	);
	const stxKeyId: OwnershipProofData | undefined = $sessionStore.proofs?.ownershipData?.find(
		(o) => o.chain === CHAIN.STACKS
	);

	const signedMessage = (e: any) => {
		const payload = e.detail;
		if (!$sessionStore.proofs.ownershipData) $sessionStore.proofs.ownershipData = [];
		$sessionStore.proofs.ownershipData.push(payload);
		sessionStore.update(() => $sessionStore);
		console.log(payload);
	};
</script>

<div class="min-h-screen flex flex-col justify-start mt-5 items-center bg-black text-white p-6">
	<!-- Header Section -->
	<h1 class="text-4xl font-bold mb-4 text-primary-500">Proof of Ownership</h1>
	<p class="text-lg mb-2 text-gray-300 text-center max-w-3xl">
		Connect at least one wallet by signing a short message to prove ownership of the account and
		everything the account owns
	</p>

	<!-- Data Collection Explanation -->
	<div class="bg-gray-900 rounded-lg shadow-lg p-6 max-w-3xl w-full">
		<h2 class="text-2xl font-semibold mb-4 text-primary-500">
			Supported Wallets<span class="mb-3 text-red-700">*</span>
			<span class="text-sm mt-6 text-gray-500 text-center">(provide at least one key)</span>
		</h2>

		<div>
			<div class="flex flex-col my-5 mt-10">
				<div class="grid">
					<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div class="shadow-md rounded-lg py-8 text-[#ffffff] h-[190px] bg-[#54B3EB]">
							<div class="px-4 flex justify-content-start">
								{#if !ethKeyId}
									<Ethereum on:signedMessage={signedMessage} />
								{:else}
									<DisplayKeyInfo keyInfo={ethKeyId} />
								{/if}
							</div>
						</div>
						<div class="shadow-md rounded-lg py-8 text-[#ffffff] h-[190px] bg-[#E4CB49]">
							<div class="px-4 flex justify-content-start">
								{#if !solKeyId}
									<Solana on:signedMessage={signedMessage} />
								{:else}
									<DisplayKeyInfo keyInfo={solKeyId} />
								{/if}
							</div>
						</div>
						<div class="shadow-md rounded-lg py-8 text-[#ffffff] h-[190px] bg-[#E59FD5]">
							<div class="px-4 flex justify-content-start">
								{#if !stxKeyId}
									<Stacks on:signedMessage={signedMessage} />
								{:else}
									<DisplayKeyInfo keyInfo={stxKeyId} />
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<p class="text-sm mt-6 text-gray-500 text-center">
			No data is collected or sent anywhere. We generate a zero knowledge proof that you can later
			use to verify yourself as a human being on different chains and projects
		</p>
	</div>

	<!-- Action Button -->
	<div class="w-full mt-8 flex justify-center">
		<button
			on:click={() => goto('/proofs/likeness')}
			disabled={$sessionStore.proofs?.ownershipData?.length === 0}
			class="bg-primary-500 hover:bg-primary-600 text-black font-semibold py-2 px-6 rounded transition duration-200 disabled:bg-gray-800 disabled:text-gray-300 disabled:cursor-not-allowed"
		>
			<ArrowRightAltOutline class="inline" /> Continue
		</button>
	</div>
</div>
