<script lang="ts">
	import { tupleCV, uintCV, listCV, bufferCV } from '@stacks/transactions';
	import { hex } from '@scure/base';
	import { onMount } from 'svelte';
	import { sha256 } from '@noble/hashes/sha256';
	import { bitcoinToSats, explorerAddressUrl } from '$lib/utils';
	import { getConfig } from '$stores/store_helpers';
	import {
		fetchBitcoinTransaction,
		fetchBlock,
		fetchBlockTxIdList,
		generateMerkleRoot,
		generateMerkleTree,
		getParametersForProof
	} from '$lib/proofs/merkle_utils';
	import { payloadParseTransaction } from '$lib/proofs/merkle_utils';
	import {
		getStacksAddress,
		type PayloadType,
		type TxMinedParameters
	} from '@mijoco/stx_helpers/dist/index';
	import { sessionStore } from '$stores/stores';

	export let txId: string;
	let tx: any;
	let block: any;
	let showTree = false;
	let allowMint = false;
	let amount = 0;
	let contractParameters: any;
	let contract = 'ST1R1061ZT6KPJXQ7PAXPFB6ZAZ6ZWW28G8HXK9G5.clarity-bitcoin-mini-1';
	if (getConfig().VITE_NETWORK === 'devnet')
		contract = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.clarity-bitcoin-mini-1';
	let stxAddress: string | undefined;
	let merkleTree: Array<Array<string>>;
	let parameters: TxMinedParameters;
	let proofString: string | undefined;
	let proofs: Array<any>;
	let error: string | undefined;
	let answer: any;
	let blockHashCheck = false;
	let merkleRootCheck = false;
	let mrT: string;
	let inited = false;
	let functionName: string;
	let blockHash: any;
	let txs: Array<string>;
	let componentKey = 0;

	const coordinator = true;

	const getProofTuple = function () {
		const entryList = [];
		const merkleProofs = proofString
			? proofString.split(' ')
			: parameters.proofElements.map(({ hash }) => hash);
		for (let i = 0; i < merkleProofs.length; i++) {
			const entry = merkleProofs[i];
			const buffProof = bufferCV(hex.decode(entry));
			entryList.push(buffProof);
		}
		const datum = tupleCV({
			'tx-index': uintCV(parameters.txIndex),
			hashes: listCV(entryList)
		});

		return datum;
	};

	const getProofsAsCV = function () {
		const entryList = [];
		const merkleProofs = proofString
			? proofString.split(' ')
			: parameters.proofElements.map(({ hash }) => hash);
		for (let i = 0; i < merkleProofs.length; i++) {
			const entry = merkleProofs[i];
			const buffProof = bufferCV(hex.decode(entry));
			entryList.push(buffProof);
		}
		return listCV(entryList);
	};

	// const wasTxMined = async () => {
	// 	const proofData = getProofTuple();
	// 	const functionArgs = [
	// 		`0x${hex.encode(serializeCV(uintCV(parameters.height)))}`,
	// 		`0x${hex.encode(serializeCV(bufferCV(hex.decode(tx.txid))))}`,
	// 		`0x${hex.encode(serializeCV(bufferCV(hex.decode(parameters.headerHex))))}`,
	// 		`0x${hex.encode(serializeCV(proofData))}`
	// 	];
	// 	contractParameters = {
	// 		name: parameters.height,
	// 		txid: tx.txid,
	// 		header: parameters.headerHex,
	// 		proofs: proofString
	// 			? proofString.split(' ').join('<br/>')
	// 			: parameters.proofElements.map(({ hash }) => hash).join('<br/>'),
	// 		'tx-index': parameters.txIndex
	// 	};

	// 	functionName = 'was-txid-mined';
	// 	const params = {
	// 		contractAddress: contract.split('.')[0],
	// 		contractName: contract.split('.')[1],
	// 		functionName: 'was-txid-mined',
	// 		functionArgs
	// 	};

	// 	const res = await callContractReadOnly(params);
	// 	if (res && res.success) {
	// 		answer = 'Result: ' + res.value.value;
	// 	} else {
	// 		answer = 'Result error: u' + res.value.value;
	// 	}
	// 	console.log(answer);
	// };

	// const verifyBlockHeader = async () => {
	// 	console.log('parameters.headerHex: ' + parameters.headerHex.length);
	// 	console.log('parameters.headerHex: ' + hex.decode(parameters.headerHex).length);
	// 	const txid = tx.txid;
	// 	const functionArgs = [
	// 		`0x${hex.encode(serializeCV(bufferCV(hex.decode(parameters.headerHex))))}`,
	// 		`0x${hex.encode(serializeCV(uintCV(parameters.height)))}`
	// 	];

	// 	functionName = 'verify-block-header';
	// 	const params = {
	// 		contractAddress: contract.split('.')[0],
	// 		contractName: contract.split('.')[1],
	// 		functionName: 'verify-block-header',
	// 		functionArgs
	// 	};
	// 	contractParameters = {
	// 		name: parameters.height,
	// 		header: parameters.headerHex
	// 	};

	// 	const res = await callContractReadOnly(params);
	// 	if (res && res.success) {
	// 		answer = 'Result: ' + res.value.value;
	// 	} else {
	// 		answer = 'Result: ' + res.value;
	// 	}
	// 	console.log(answer);
	// };

	// const verifyMerkleProof = async () => {
	// 	const txid = tx.txid;
	// 	const functionArgs = [
	// 		`0x${hex.encode(serializeCV(bufferCV(hex.decode(tx.txid).reverse())))}`,
	// 		`0x${hex.encode(serializeCV(bufferCV(hex.decode(merkle_root).reverse())))}`,
	// 		`0x${hex.encode(serializeCV(getProofTuple()))}`
	// 	];

	// 	functionName = 'verify-merkle-proof';
	// 	const params = {
	// 		contractAddress: contract.split('.')[0],
	// 		contractName: contract.split('.')[1],
	// 		functionName: 'verify-merkle-proof',
	// 		functionArgs
	// 	};
	// 	contractParameters = {
	// 		'txid-reversed': hex.encode(hex.decode(tx.txid).reverse()),
	// 		'root-reversed': hex.encode(hex.decode(merkle_root).reverse()),
	// 		proofs: proofString
	// 			? proofString.split(' ').join('<br/>')
	// 			: parameters.proofElements.map(({ hash }) => hash).join('<br/>'),
	// 		'tx-index': parameters.txIndex
	// 	};

	// 	const res = await callContractReadOnly(params);
	// 	if (res && res.success) {
	// 		answer = 'Result: ' + res.value.value;
	// 	} else {
	// 		answer = 'Result: ' + res.value;
	// 	}

	// 	console.log(answer);
	// };

	// const mintTo = async () => {
	// 	let prin = data.stacksAddress;
	// 	if (typeof data.lengthOfCname === 'number' && data.lengthOfCname > 0) prin += '.' + data.cname;
	// 	contractParameters = {
	// 		amount: tx.vout[1].amount,
	// 		txid: hex.encode(hex.decode(tx.txid)),
	// 		stxAddress: prin,
	// 		proofs: proofString
	// 			? proofString.split(' ').join('<br/>')
	// 			: parameters.proofElements.map(({ hash }) => hash).join('<br/>'),
	// 		'tx-index': parameters.txIndex
	// 	};

	// 	const res = await romeoMintTo(
	// 		$sessionStore.sbtcInfo.sbtcContractData.contractId,
	// 		amount,
	// 		prin!,
	// 		tx.txid,
	// 		parameters.height,
	// 		getProofsAsCV(),
	// 		parameters.txIndex,
	// 		parameters.headerHex
	// 	);
	// 	console.log(res);
	// };

	// const withdrawTo = async () => {
	// 	let prin = data.stacksAddress;
	// 	if (typeof data.lengthOfCname === 'number' && data.lengthOfCname > 0) prin += '.' + data.cname;
	// 	contractParameters = {
	// 		amount: tx.vout[1].amount,
	// 		txid: hex.encode(hex.decode(tx.txid)),
	// 		stxAddress: prin,
	// 		proofs: proofString
	// 			? proofString.split(' ').join('<br/>')
	// 			: parameters.proofElements.map(({ hash }) => hash).join('<br/>'),
	// 		'tx-index': parameters.txIndex
	// 	};

	// 	const res = await romeoWithdrawTo(
	// 		$sessionStore.sbtcInfo.sbtcContractData.contractId,
	// 		amount,
	// 		prin!,
	// 		tx.txid,
	// 		parameters.height,
	// 		getProofsAsCV(),
	// 		parameters.txIndex,
	// 		parameters.headerHex
	// 	);
	// 	console.log(res);
	// };

	const verify = async () => {
		tx = await fetchBitcoinTransaction(txId);
		try {
			blockHash = tx.status ? tx.status.block_hash : tx.blockhash;
			if (blockHash) {
				block = await fetchBlock(blockHash);
				txs = await fetchBlockTxIdList(blockHash);
				block.txs = txs;
			}
		} catch (err: any) {}
		componentKey++;
	};

	onMount(async () => {
		sessionStore.update((conf) => {
			conf.testData = {
				bitcoinTxid: txId
			};
			return conf;
		});
		await verify();
		const txIds = block.txs.map(function (txid: string) {
			//return hex.encode(hex.decode(tx.txid).reverse()) //hexReverse(tx.txid)
			return hex.encode(hex.decode(txid).reverse()); //hexReverse(tx.txid)
		});
		answer = undefined;
		console.log('tx0-r: ' + txIds[0]);

		//data = await payloadParseTransaction(tx.txid);
		//deposit = data.opcode === '3C';

		mrT = generateMerkleRoot(txIds);
		mrT = hex.encode(hex.decode(mrT).reverse());

		//if (hex.encode(hex.decode(mrT).reverse()) !== merkle_root) throw new Error('Merkle root error')
		merkleTree = generateMerkleTree(txIds);
		console.log('mr0: ' + block.merkle_root);
		console.log('mrT: ' + mrT);
		parameters = getParametersForProof(tx.txid, tx.hex, block);
		proofs = parameters.proofElements;
		blockHashCheck =
			block.id === hex.encode(sha256(sha256(hex.decode(parameters.headerHex))).reverse());
		merkleRootCheck = block.merkle_root === mrT;

		proofString = parameters.proofElements.map(({ hash }) => hash).join(' ');
		amount = bitcoinToSats(tx.vout[1].value);
		stxAddress = getStacksAddress(getConfig().VITE_NETWORK);
		answer = undefined;
		inited = true;
	});
</script>

{#if inited}
	<div class=" w-full my-5">
		{#if error}<p class="text-danger">{error}</p>{/if}
		<div class="pb-5">
			<label for="transact-path">Merkle root</label>
			<div
				class={merkleRootCheck
					? 'bg-success-500 text-white px-4 py-2 rounded border-success-500'
					: 'bg-gray-600 text-white px-4 py-2 rounded border-white'}
			>
				{block.merkle_root}
			</div>
		</div>

		<div class="pb-5">
			<label for="transact-path">Block hash</label>
			<div
				class={blockHashCheck
					? 'bg-success-500 text-white px-4 py-2 rounded border-success-500'
					: 'bg-gray-600 text-white px-4 py-2 rounded border-white'}
			>
				{block.id}
			</div>
		</div>
		<div class="pb-5">
			<label for="transact-path">header</label>
			<input
				type="text"
				class="text-black block p-3 rounded-md border w-full"
				bind:value={parameters.headerHex}
			/>
		</div>
		<div class="pb-5">
			<label for="transact-path">height</label>
			<input
				type="number"
				class="text-black block p-3 rounded-md border w-full"
				bind:value={parameters.height}
			/>
		</div>

		<div class="pb-5">
			<label for="transact-path">txIndex</label>
			<input
				type="text"
				class="text-black block p-3 rounded-md border w-full"
				bind:value={parameters.txIndex}
			/>
		</div>

		<div class="p-5 bg-gray-200 text-black rounded-lg border-gray-700">
			<div class="text-2xl">Proof (space separated):</div>
			<!--
    {#each parameters.proofElements as node}
    <div class="">{node.direction} : {node.hash}</div>
    {/each}-->
			<textarea
				rows="8"
				class="text-black block p-3 rounded-md border w-full"
				bind:value={proofString}
			/>
		</div>

		<div class="my-5 flex justify-end">
			<div class="text-xs">
				{#if coordinator}
					<span class="border-e me-4 pe-4"
						><a
							href="/"
							on:click|preventDefault={() => {
								allowMint = !allowMint;
								showTree = false;
								answer = undefined;
							}}
							target="_blank">allow mint</a
						></span
					>
				{/if}

				<span class="border-e me-4 pe-4"
					><a href="/" on:click|preventDefault={() => (showTree = !showTree)} target="_blank"
						>show full merkle tree</a
					></span
				>
				<span class=""><a href={explorerAddressUrl(contract)} target="_blank">contract</a></span>
			</div>
		</div>

		<div class="my-5 flex gap-x-5 items-baseline">
			<!--
			<div class="">
				<Button
					darkScheme={false}
					label={'Was Tx Mined'}
					target={''}
					on:clicked={() => wasTxMined()}
				/>
			</div>
			<div class="">
				<Button
					darkScheme={false}
					label={'Verify Block Header'}
					target={''}
					on:clicked={() => verifyBlockHeader()}
				/>
			</div>
			<div class="">
				<Button
					darkScheme={false}
					label={'Verify Merkle Proof'}
					target={''}
					on:clicked={() => verifyMerkleProof()}
				/>
			</div>
      -->
		</div>
		{#if answer}
			<div class="mb-5">{functionName}</div>
			<div class="mb-5">{@html answer}</div>
			<div class="flex flex-col">
				{#each Object.entries(contractParameters) as [name, value]}
					<div class="flex justify-start mb-3 border-b">
						<div class="w-1/5">{name}:</div>
						<div>{@html value}</div>
					</div>
				{/each}
			</div>
			<!--
			{#if deposit}
				<div class="my-5 flex gap-x-5 items-baseline">
					<div class="">
						<Button darkScheme={false} label={'Mint'} target={''} on:clicked={() => mintTo()} />
					</div>
				</div>
			{:else}
				<div class="my-5 flex gap-x-5 items-baseline">
					<div class="">
						<Button
							darkScheme={false}
							label={'Withdraw'}
							target={''}
							on:clicked={() => withdrawTo()}
						/>
					</div>
				</div>
			{/if}
      -->
		{/if}

		{#if allowMint}
			<div class="my-5">
				<label for="transact-path">Mint: stacks address</label>
				<input
					type="text"
					class="text-black block p-3 rounded-md border w-full"
					bind:value={stxAddress}
				/>
			</div>

			<div class="mb-5">
				<label for="transact-path">Amount (sats)</label>
				<input
					type="number"
					class="text-black block p-3 rounded-md border w-full"
					bind:value={amount}
				/>
			</div>
		{/if}

		{#if showTree}
			<div class="p-5 bg-gray-200 text-black rounded-lg border-gray-700">
				<div class="text-2xl">Tree:</div>
				{#each merkleTree.reverse() as nodes, index}
					{#each nodes as node}
						<div>{index} : {node}</div>
					{/each}
				{/each}
			</div>
		{/if}
	</div>
{/if}
