<script lang="ts">
	import VerifyTransactions from './VerifyTransactions.svelte';
	import DecodeSbtc from './DecodeTransaction.svelte';
	import { onMount } from 'svelte';
	import Button from '$lib/common/Button.svelte';
	import { sessionStore } from '$stores/stores';
	import DecodeTransaction from './DecodeTransaction.svelte';

	let txId: string;
	let error: string | undefined;
	let componentKey = 0;
	let readyGenerateProof = false;
	let readyDecodeTx = false;

	const clazzOn =
		"bg-white relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-white before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]";
	const clazzOff =
		"         relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-white before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]";

	onMount(async () => {
		txId = $sessionStore.testData?.bitcoinTxid || '';
	});
</script>

<div class="flex flex-col w-full">
	<div class="mb-5 text-2xl">Verify transactions</div>
	{#if error}<p class="text-danger">{error}</p>{/if}

	<div class="pb-5">
		<input
			type="text"
			placeholder="Enter transaction id"
			class="text-black block p-3 rounded-md border w-full"
			bind:value={txId}
		/>
	</div>

	{#if txId}
		<div class="flex gap-5">
			<Button
				darkScheme={false}
				label={'Generate Proof'}
				target={''}
				on:clicked={() => {
					readyDecodeTx = false;
					readyGenerateProof = true;
					componentKey++;
				}}
			/>
			<Button
				darkScheme={false}
				label={'Decode tx'}
				target={''}
				on:clicked={() => {
					readyDecodeTx = true;
					readyGenerateProof = false;
					componentKey++;
				}}
			/>
		</div>
	{/if}

	<div class="">
		{#key componentKey}
			{#if readyGenerateProof}
				<VerifyTransactions {txId} />
			{/if}
			{#if readyDecodeTx}
				<DecodeTransaction {txId} />
			{/if}
		{/key}
	</div>
</div>
