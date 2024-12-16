<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchTransactionHex } from '@mijoco/btc_helpers/dist/index';
	import { parseRawTransaction, type TransactionOutput } from '@mijoco/tx_anatomy/dist/index';
	import { getConfig } from '$stores/store_helpers';

	export let txId: string;
	let txHex: string;
	let res: any;
	let error: string | undefined;
	let inited = false;
	let outputs: Array<TransactionOutput> = [];

	const getType = (opCode: string) => {
		if (opCode.toUpperCase() === '3E') return 'withdrawal';
		else if (opCode.toUpperCase() === '3C') return 'deposit';
		else return 'unknown';
	};

	const breakdownTransaction = async (txid: string) => {
		const txHex = await fetchTransactionHex(getConfig().VITE_MEMPOOL_API, txid);
		outputs = parseRawTransaction(getConfig().VITE_NETWORK, txHex!);
	};

	onMount(async () => {
		breakdownTransaction(txId);
		inited = true;
	});
</script>

{#if inited}
	<div class=" w-full">
		{#if error}<p class="text-danger">{error}</p>{/if}
		{#if outputs}
			<div class="bg-gray-900 my-5 border rounded-lg border-l-gray-800">
				<p class="text-danger p-3 mb-3">Transaction has {outputs.length} outputs</p>
				{#each outputs as output, index}
					<div class="bg-gray-900 p-3 mb-0 border-b border-dashed">
						<div class="flex gap-5 justify-start">
							<div class="w-1/5">{index}: {output.type}</div>
							<div class="w-4/5 justify-start break-words">{output.data}</div>
						</div>
						<div class="flex gap-5 justify-start">
							<div class="w-1/5"></div>
							<div class="w-4/5 justify-start">{output.amount}</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
		{#if res}
			<div><h2 class="text-2xl mb-2 pb-2 border-b-2">sBTC Data</h2></div>
			<div class="flex gap-x-5 justify-start">
				<div class="w-1/5">Type</div>
				<div class="w-4/5 justify-start">{getType(res.opcode)}</div>
			</div>
			<div class="flex gap-x-5 justify-start">
				<div class="w-1/5">Amount (sats)</div>
				<div class="w-4/5 justify-start">{res.amountSats}</div>
			</div>
			<div class="flex gap-x-5 justify-start">
				<div class="w-1/5">Principle</div>
				<div class="w-4/5 justify-start">
					{res.stacksAddress}{#if res.lengthOfCname > 0}.{res.cname}{/if}
				</div>
			</div>
			<div class="flex gap-x-5 justify-start">
				<div class="w-1/5">Peg Wallet</div>
				<div class="w-4/5 justify-start">{res.sbtcWallet}</div>
			</div>
			{#if res.opcode.toUpperCase() === '3C'}
				<div class="flex gap-x-5 justify-start">
					<div class="w-1/5">Principle Type</div>
					<div class="w-4/5 justify-start">{res.prinType}</div>
				</div>
			{:else}
				<div class="flex gap-x-5 justify-start">
					<div class="w-1/5">Recipient</div>
					<div class="w-4/5 justify-start">{res.spendingAddress}</div>
				</div>
				<div class="flex gap-x-5 justify-start">
					<div class="w-1/5">Signature</div>
					<div class="w-4/5 overflow-auto">{res.signature}</div>
				</div>
			{/if}
		{/if}
	</div>
{/if}
